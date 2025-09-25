import { initTensorFlow, loadObjectDetectionModel } from './tensorflow.js';
import { detectObjectsInImage } from '../detection/object-detection.js';

// Initialize TensorFlow and load model
const initInference = async () => {
    try {
        console.log('Initializing TensorFlow in inference worker...');
        await initTensorFlow('inference');
        await loadObjectDetectionModel('inference');
        console.log('Inference worker ready');
    } catch (error) {
        console.error('Error initializing inference worker:', error);
        process.exit(1);
    }
};

// Handle detection requests
process.on('message', async message => {
    if (message.type === 'detect_request') {
        try {
            // Reconstruct Buffer from IPC
            const { imageBuffer, requestId, streamId } = message;
            const buffer = Buffer.from(imageBuffer);

            // Process detection
            console.log(`Processing detection request ${requestId} from ${streamId} in inference worker`);
            const detectionData = await detectObjectsInImage({ imageBuffer: buffer });

            // Send back the detection results
            process.send({
                type: 'detect_response',
                requestId,
                detections: detectionData.detections,
                annotatedImage: detectionData.annotatedImage
            });
        } catch (error) {
            console.error(`Error in detection for request ${message.requestId}:`, error);
            process.send({
                type: 'detect_response',
                requestId: message.requestId,
                error: error.message
            });
        }
    }
});

// Initialize
initInference();