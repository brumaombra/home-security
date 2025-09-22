import { detectObjects } from '../tensorflow/tensorflow.js';
import { processImage, drawDetections, imageToBase64 } from '../image/image.js';
import { roundPercentage } from '../utils/utils.js';

// Detect the objects in the image
export const detectObjectsInImage = async ({ imageBuffer, generateImage = true }) => {
    try {
        const { tensor, width, height, originalImage } = await processImage({ imageBuffer: imageBuffer, resize: true }); // Process the uploaded image
        const predictions = await detectObjects(tensor); // Perform object detection
        tensor.dispose(); // Clean up tensor to free memory
        console.log(`🔍 Found ${predictions.length} objects`);

        // Format the results
        const results = predictions.map(prediction => ({
            class: prediction.class,
            score: roundPercentage(prediction.score),
            bbox: {
                x: Math.round(prediction.bbox[0]),
                y: Math.round(prediction.bbox[1]),
                width: Math.round(prediction.bbox[2]),
                height: Math.round(prediction.bbox[3])
            }
        }));

        // If enabled, generate annotated image in base64
        let base64ImageWithDetections = null;
        if (generateImage) {
            try {
                console.log('🎨 Generating annotated image with detections');
                const annotatedImage = await drawDetections(originalImage, predictions); // Draw detections on image
                const base64Image = await imageToBase64(annotatedImage); // Convert annotated image to base64
                base64ImageWithDetections = `data:image/jpeg;base64,${base64Image}`; // Prepare data URL
            } catch (error) {
                console.error('❌ Error generating annotated image:', error);
                throw new Error('Failed to generate annotated image');
            }
        }

        // Return the data
        return {
            imageInfo: {
                width: width,
                height: height
            },
            detections: results,
            annotatedImage: base64ImageWithDetections
        };
    } catch (error) {
        console.error('❌ Error processing image for object detection:', error);
        throw error;
    }
};