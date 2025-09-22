import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { detectObjectsInImage } from '../detection/object-detection.js';
import { startStreamAnalysis, stopStreamAnalysis } from '../stream/stream.js';
import { saveBase64ImageToFile } from '../utils/utils.js';

let lastFrame = null;
let isMovementDetected = false;
let skipCounter = 0;

// Detect movement between frames
export const detectMovement = async ({ image, cooldownTime = 0, framesToSkip = 5 }) => {
    // Convert raw image to PNG format
    const pngFrame = new PNG({ width: image.width, height: image.height });
    pngFrame.data = image.data;

    // If there's a previous frame, compare it with the current one
    if (lastFrame) {
        const diff = new PNG({ width: image.width, height: image.height });

        // Compare the two frames
        const numDiffPixels = pixelmatch(
            lastFrame.data,
            pngFrame.data,
            diff.data,
            image.width,
            image.height,
            { threshold: 0.1 }
        );

        // If the number of different pixels exceeds a threshold, log movement
        if (numDiffPixels > 5000) {
            if (!isMovementDetected) {
                console.log(`🚶 Movement detected! Skipping ${framesToSkip} frames before analysis...`);
                isMovementDetected = true;
                skipCounter = framesToSkip;
            }
        }
    }

    // Handle skipping and analysis
    if (isMovementDetected) {
        if (skipCounter > 0) {
            skipCounter--; // Decrement skip counter
        } else {
            console.log('🔍 Analyzing frame after skipping...');
            stopStreamAnalysis(); // Stop further analysis to save resources
            await analyzeMovementImage({ pngFrame }); // Analyze the current frame for object detection
            setTimeout(() => {
                startStreamAnalysis(); // Resume analysis after processing
            }, cooldownTime); // Wait before resuming
            isMovementDetected = false; // Reset for next detection
        }
    }

    // Update last frame
    lastFrame = pngFrame;
};

// Analyze a single image for movement and object detection
const analyzeMovementImage = async ({ pngFrame }) => {
    console.log('🔍 Analyzing frame for object detection...');

    try {
        // Create PNG buffer from current frame
        const pngBuffer = PNG.sync.write(pngFrame);

        // Perform object detection
        const detectionData = await detectObjectsInImage({ imageBuffer: pngBuffer });
        console.log('🔍 Object detections:', detectionData.detections);
        if (detectionData.annotatedImage) {
            console.log('🎨 Annotated image generated');
            saveBase64ImageToFile(detectionData.annotatedImage);
        }
    } catch (error) {
        console.error('❌ Error in object detection:', error);
    }
};