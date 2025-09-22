import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { detectObjectsInImage } from '../detection/object-detection.js';
import { startStreamAnalysis, stopStreamAnalysis } from '../stream/stream.js';
import { saveBase64ImageToFile } from '../utils/utils.js';

let lastFrame = null;

// Detect movement between frames
export const detectMovement = async rawImage => {
    // Convert raw image to PNG format
    const pngFrame = new PNG({ width: rawImage.width, height: rawImage.height });
    pngFrame.data = rawImage.data;

    // If there's a previous frame, compare it with the current one
    if (lastFrame) {
        const diff = new PNG({ width: rawImage.width, height: rawImage.height });

        // Compare the two frames
        const numDiffPixels = pixelmatch(
            lastFrame.data,
            pngFrame.data,
            diff.data,
            rawImage.width,
            rawImage.height,
            { threshold: 0.1 }
        );

        // If the number of different pixels exceeds a threshold, log movement
        if (numDiffPixels > 5000) {
            console.log('⚠️ Movement detected!');
            stopStreamAnalysis(); // Stop further analysis to save resources
            await analyzeMovementImage(pngFrame); // Analyze the current frame for object detection
            startStreamAnalysis(); // Resume analysis after processing
        }
    }

    // Update last frame
    lastFrame = pngFrame;
};

// Analyze a single image for movement and object detection
const analyzeMovementImage = async pngFrame => {
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