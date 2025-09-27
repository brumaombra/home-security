import { processImage, drawDetections, imageToBase64 } from '../image/image.js';
import { printLog } from '../utils/utils.js';
import { callPythonInference } from './python-inference.js';

// Detect the objects in the image
export const detectObjectsInImage = async ({ imageBuffer, generateImage = true }) => {
    try {
        const { width, height, originalImage } = await processImage({ imageBuffer: imageBuffer, resize: false }); // Process the uploaded image without resizing for Python
        const base64Image = imageBuffer.toString('base64'); // Convert image to base64
        const detectionData = await callPythonInference(base64Image, 0.25); // Call Python inference server
        const detections = detectionData.detections || []; // Extract detections array
        printLog(`Found ${detections.length} objects`);

        // If enabled, generate annotated image in base64
        let base64ImageWithDetections = null;
        if (generateImage) {
            try {
                printLog('Generating annotated image with detections...');
                const annotatedImage = await drawDetections(originalImage, detections); // Draw detections on image
                base64ImageWithDetections = await imageToBase64(annotatedImage); // Convert annotated image to base64
            } catch (error) {
                printLog('Error generating annotated image:', { type: 'error', error });
                throw new Error('Failed to generate annotated image');
            }
        }

        // Return the data
        return {
            imageInfo: {
                width: width,
                height: height
            },
            detectionData: detectionData,
            annotatedImage: base64ImageWithDetections
        };
    } catch (error) {
        printLog('Error processing image for object detection:', { type: 'error', error });
        throw error;
    }
};