import { detectPoses } from '../tensorflow/tensorflow.js';
import { processImage, drawPoses, imageToBase64 } from '../image/image.js';
import { roundPercentage } from '../utils/utils.js';

// Detect the poses in the image
export const detectPosesInImage = async ({ imageBuffer, generateImage = true }) => {
    try {
        const { tensor, width, height, originalImage } = await processImage({ imageBuffer: imageBuffer, resize: true }); // Process the uploaded image
        const poses = await detectPoses(tensor); // Perform pose detection
        tensor.dispose(); // Clean up tensor to free memory
        console.log(`🏃 Found ${poses.length} poses`);

        // Format the results
        const results = poses.map(pose => ({
            score: roundPercentage(pose.score),
            keypoints: pose.keypoints.map(keypoint => ({
                name: keypoint.name,
                x: Math.round(keypoint.x),
                y: Math.round(keypoint.y),
                score: roundPercentage(keypoint.score)
            }))
        }));

        // If enabled, generate annotated image in base64
        let base64ImageWithPoses = null;
        if (generateImage) {
            try {
                console.log('Generating annotated image with poses');
                const annotatedImage = await drawPoses(originalImage, poses); // Draw poses on image
                base64ImageWithPoses = await imageToBase64(annotatedImage); // Convert annotated image to base64
            } catch (error) {
                console.error('Error generating annotated image:', error);
                throw new Error('Failed to generate annotated image');
            }
        }

        // Return the data
        return {
            imageInfo: {
                width: width,
                height: height
            },
            poses: results,
            annotatedImage: base64ImageWithPoses
        };
    } catch (error) {
        console.error('❌ Error processing image for pose detection:', error);
        throw error;
    }
};