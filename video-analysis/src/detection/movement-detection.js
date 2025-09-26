import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { detectObjectsInImage } from '../detection/object-detection.js';
import { startStreamAnalysis, stopStreamAnalysis } from '../stream/stream.js';
import { saveBase64ImageToFile, printLog } from '../utils/utils.js';
import { addEvent } from '../storage/events.js';

let streamStates = {}; // Object to hold state for each stream

// Detect movement between frames for a specific stream
export const detectMovement = async ({ image, cooldownTime = 0, framesToSkip = 5, streamId }) => {
    // Initialize state for this stream if it doesn't exist
    if (!streamStates[streamId]) {
        streamStates[streamId] = {
            lastFrame: null,
            isMovementDetected: false,
            skipCounter: 0
        };
    }

    // Get the state for this stream
    const state = streamStates[streamId];

    // Convert raw image to PNG format
    const pngFrame = new PNG({ width: image.width, height: image.height });
    pngFrame.data = image.data;

    // If there's a previous frame, compare it with the current one
    if (state.lastFrame) {
        const diff = new PNG({ width: image.width, height: image.height });

        // Compare the two frames
        const numDiffPixels = pixelmatch(
            state.lastFrame.data,
            pngFrame.data,
            diff.data,
            image.width,
            image.height,
            { threshold: 0.1 }
        );

        // If the number of different pixels exceeds a threshold, log movement
        if (numDiffPixels > 5000) {
            if (!state.isMovementDetected) {
                printLog(`Movement detected on ${streamId}! Skipping ${framesToSkip} frames before analysis...`);
                state.isMovementDetected = true;
                state.skipCounter = framesToSkip;
            }
        }
    }

    // Handle skipping and analysis
    if (state.isMovementDetected) {
        if (state.skipCounter > 0) {
            state.skipCounter--; // Decrement skip counter
        } else {
            printLog(`Analyzing frame from ${streamId} after skipping...`);
            stopStreamAnalysis(streamId); // Stop further analysis for this stream to save resources
            await analyzeMovementImage({ pngFrame, streamId }); // Analyze the current frame for object detection
            setTimeout(() => {
                startStreamAnalysis(streamId); // Resume analysis for this stream after processing
            }, cooldownTime); // Wait before resuming
            state.isMovementDetected = false; // Reset for next detection
        }
    }

    // Update last frame
    state.lastFrame = pngFrame;
};

// Analyze a single image for movement and object detection
const analyzeMovementImage = async ({ pngFrame, streamId }) => {
    printLog(`Analyzing frame from ${streamId} for object detection...`);

    const timestamp = Date.now();
    let imageFilename = null;
    let detections = [];

    try {
        // Create PNG buffer from current frame
        const pngBuffer = PNG.sync.write(pngFrame);

        // Perform object detection
        const detectionData = await detectObjectsInImage({ imageBuffer: pngBuffer });
        detections = detectionData.detections || [];

        // If an annotated image is generated, save it to a file
        if (detectionData.annotatedImage) {
            printLog(`Annotated image generated from ${streamId}`);
            imageFilename = saveBase64ImageToFile(detectionData.annotatedImage, streamId);
        }

        // Create event object
        const event = {
            id: `event_${timestamp}_${streamId}`,
            timestamp: timestamp,
            streamId: streamId,
            detectionsCount: detections.length,
            imageFilename: imageFilename,
            detections: detections.slice(0, 10) // Store first 10 detections for reference
        };

        // Save event to JSON file
        addEvent(event);
        printLog(`Event recorded: ${detections.length} object(s) detected on ${streamId}`);
    } catch (error) {
        printLog(`Error in object detection for ${streamId}:`, { type: 'error', error });
    }
};