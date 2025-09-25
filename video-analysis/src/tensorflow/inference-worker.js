import { initTensorFlow, loadObjectDetectionModel } from './tensorflow.js';
import { detectObjectsInImage } from '../detection/object-detection.js';
import { printLog } from '../utils/utils.js';

// Initialize TensorFlow and load model
const initInference = async () => {
    try {
        printLog('Initializing TensorFlow in inference worker...');
        await initTensorFlow('inference');
        await loadObjectDetectionModel('inference');
        printLog('Inference worker ready');
    } catch (error) {
        printLog('Error initializing inference worker:', { type: 'error', error });
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
            printLog(`Processing detection request ${requestId} from ${streamId} in inference worker`);
            const detectionData = await detectObjectsInImage({ imageBuffer: buffer });

            // Send back the detection results
            process.send({
                type: 'detect_response',
                requestId,
                detections: detectionData.detections,
                annotatedImage: detectionData.annotatedImage
            });
        } catch (error) {
            printLog(`Error in detection for request ${message.requestId}:`, { type: 'error', error });
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