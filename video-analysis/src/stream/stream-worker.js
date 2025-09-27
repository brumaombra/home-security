import fetch from 'node-fetch';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { saveBase64ImageToFile, printLog } from '../utils/utils.js';
import { detectObjectsInImage } from '../detection/object-detection.js';

let streamState = null; // State for this stream
let lastFrame = null;
let isMovementDetected = false;
let skipCounter = 0;
const DETECTION_COOLDOWN = 5000; // Detection cooldown period in ms

// Initialize worker
process.on('message', async message => {
    if (message.streamUrl && message.streamId) {
        await initWorker(message.streamUrl, message.streamId);
    }
});

// Initialize worker and start stream
const initWorker = async (streamUrl, streamId) => {
    try {
        printLog(`Worker starting for ${streamId} from ${streamUrl}...`);

        // Connect to MJPEG stream
        const response = await fetch(streamUrl);
        printLog(`Stream ${streamId} connection established successfully!`);

        // Notify parent that connection is successful
        process.send({ type: 'connected', streamId });

        // Initialize stream state
        streamState = {
            analyze: true,
            buffer: Buffer.alloc(0),
            url: streamUrl,
            id: streamId
        };

        // Process incoming data chunks
        response.body.on('data', async chunk => {
            if (!streamState || !streamState.analyze) return;

            // Append chunk to buffer
            streamState.buffer = Buffer.concat([streamState.buffer, chunk]);

            // Get boundary from Content-Type
            const contentType = response.headers.get('content-type');
            const boundaryMatch = contentType.match(/boundary=(.+)/);
            if (!boundaryMatch) return;
            const boundary = '--' + boundaryMatch[1];
            const boundaryBuffer = Buffer.from(boundary + '\r\n');
            const endBoundaryBuffer = Buffer.from('\r\n' + boundary);

            // Extract JPEG frames
            let pos = 0;
            while ((pos = streamState.buffer.indexOf(boundaryBuffer, pos)) !== -1) {
                // Find the end of the JPEG frame
                const endPos = streamState.buffer.indexOf(endBoundaryBuffer, pos + boundaryBuffer.length);
                if (endPos === -1) break;

                // Extract JPEG data
                const partStart = pos + boundaryBuffer.length;
                const headerEnd = streamState.buffer.indexOf('\r\n\r\n', partStart);
                if (headerEnd === -1) continue;
                const jpegStart = headerEnd + 4;

                // Extract JPEG frame
                const jpegFrame = streamState.buffer.subarray(jpegStart, endPos);

                // Decode JPEG image
                try {
                    const rawImage = jpeg.decode(jpegFrame, { useTArray: true });
                    await detectMovement(rawImage, streamId);
                } catch (err) {
                    printLog(`JPEG decode error for ${streamId}:`, { type: 'error' });
                }

                // Remove processed data from buffer
                streamState.buffer = streamState.buffer.subarray(endPos + endBoundaryBuffer.length);
                pos = 0;
            }
        });

        // Handle stream end
        response.body.on('end', () => {
            printLog(`Stream ${streamId} ended`);
            process.exit(0); // Exit worker
        });

        // Handle stream errors
        response.body.on('error', err => {
            printLog(`Stream ${streamId} error:`, { type: 'error', error: err });
        });
    } catch (error) {
        printLog(`Failed to start worker for ${streamId}:`, { type: 'error', error });
        process.exit(1);
    }
};

// Detect movement
const detectMovement = async (image, streamId) => {
    // Convert raw image to PNG
    const pngFrame = new PNG({ width: image.width, height: image.height });
    pngFrame.data = image.data;

    // Compare with last frame
    if (lastFrame) {
        const diff = new PNG({ width: image.width, height: image.height });

        // Calculate pixel differences
        const numDiffPixels = pixelmatch(
            lastFrame.data,
            pngFrame.data,
            diff.data,
            image.width,
            image.height,
            { threshold: 0.1 }
        );

        // Check for significant movement
        if (numDiffPixels > 5000) {
            if (!isMovementDetected) {
                printLog(`Movement detected on ${streamId}! Skipping 5 frames before analysis...`);
                isMovementDetected = true;
                skipCounter = 5;
            }
        }
    }

    // If movement detected, analyze frame after skipping
    if (isMovementDetected) {
        if (skipCounter > 0) {
            skipCounter--;
        } else {
            printLog(`Analyzing frame from ${streamId} after skipping...`);
            streamState.analyze = false;
            await analyzeMovementImage(pngFrame, streamId);
            setTimeout(() => {
                streamState.analyze = true;
            }, DETECTION_COOLDOWN); // Cooldown before next analysis
            isMovementDetected = false;
        }
    }

    // Update last frame
    lastFrame = pngFrame;
};

// Analyze image for objects
const analyzeMovementImage = async (pngFrame, streamId) => {
    printLog(`Analyzing frame from ${streamId} for object detection...`);
    const timestamp = Date.now();

    try {
        // Detect objects
        const pngBuffer = PNG.sync.write(pngFrame); // Convert PNG to buffer for detection
        const detectionResult = await detectObjectsInImage({ imageBuffer: pngBuffer, generateImage: true }); // Detect objects
        const detections = detectionResult.detections || [];

        // Save image
        const imageFilename = `detection_${timestamp}_${streamId}.jpg`;
        saveBase64ImageToFile(detectionResult.annotatedImage, imageFilename);
        printLog(`Detections found on ${streamId}: ${detections.length}, image saved as ${imageFilename}`);

        // Create event object
        const event = {
            id: `event_${timestamp}_${streamId}`,
            timestamp: timestamp,
            streamId: streamId,
            detectionsCount: detections.length,
            imageFilename: imageFilename,
            detections: detections.slice(0, 10)
        };

        // Send event to parent
        process.send({ type: 'event', event });
    } catch (error) {
        printLog(`Error in object detection for ${streamId}:`, { type: 'error', error });
    }
};