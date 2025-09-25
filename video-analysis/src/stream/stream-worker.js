import fetch from 'node-fetch';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { initTensorFlow, loadObjectDetectionModel } from '../tensorflow/tensorflow.js';
import { detectObjectsInImage } from '../detection/object-detection.js';
import { saveBase64ImageToFile } from '../utils/utils.js';

let streamState = null; // State for this stream
let lastFrame = null;
let isMovementDetected = false;
let skipCounter = 0;

// Initialize worker
process.on('message', async message => {
    if (message.streamUrl && message.streamId) {
        await initWorker(message.streamUrl, message.streamId);
    }
});

// Initialize TensorFlow and start stream
const initWorker = async (streamUrl, streamId) => {
    try {
        console.log(`Worker starting for ${streamId} from ${streamUrl}...`);

        // Initialize TensorFlow and load model
        await initTensorFlow(streamId);
        await loadObjectDetectionModel(streamId);

        // Connect to MJPEG stream
        const response = await fetch(streamUrl);
        console.log(`Stream ${streamId} connection established successfully!`);

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
                    console.error(`JPEG decode error for ${streamId}:`, err.message);
                }

                // Remove processed data from buffer
                streamState.buffer = streamState.buffer.subarray(endPos + endBoundaryBuffer.length);
                pos = 0;
            }
        });

        // Handle stream end
        response.body.on('end', () => {
            console.log(`Stream ${streamId} ended`);
            process.exit(0); // Exit worker
        });

        // Handle stream errors
        response.body.on('error', err => {
            console.error(`Stream ${streamId} error:`, err.message);
        });
    } catch (error) {
        console.error(`Failed to start worker for ${streamId}:`, error.message);
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
                console.log(`Movement detected on ${streamId}! Skipping 5 frames before analysis...`);
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
            console.log(`Analyzing frame from ${streamId} after skipping...`);
            streamState.analyze = false;
            await analyzeMovementImage(pngFrame, streamId);
            setTimeout(() => {
                streamState.analyze = true;
            }, 2000);
            isMovementDetected = false;
        }
    }

    // Update last frame
    lastFrame = pngFrame;
};

// Analyze image for objects
const analyzeMovementImage = async (pngFrame, streamId) => {
    console.log(`Analyzing frame from ${streamId} for object detection...`);
    const timestamp = Date.now();
    let imageFilename = null;
    let detections = [];

    try {
        // Convert PNG to buffer for detection
        const pngBuffer = PNG.sync.write(pngFrame);
        const detectionData = await detectObjectsInImage({ imageBuffer: pngBuffer });
        detections = detectionData.detections || [];

        // Save annotated image if available
        if (detectionData.annotatedImage) {
            console.log(`Annotated image generated from ${streamId}`);
            imageFilename = saveBase64ImageToFile(detectionData.annotatedImage, streamId);
        }

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
        console.error(`Error in object detection for ${streamId}:`, error);
    }
};