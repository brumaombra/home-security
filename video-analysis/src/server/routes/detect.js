import express from 'express';
import { getMulterUploadMiddleware } from '../multer.js';

const router = express.Router();
const multerMiddleware = getMulterUploadMiddleware();

// Endpoint for object detection
router.post('/', multerMiddleware, async (req, res) => {
    try {
        // Check if the file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Get inference worker from app
        const inferenceWorker = req.app.locals.inferenceWorker;
        if (!inferenceWorker) {
            return res.status(500).json({ error: 'Inference worker not available' });
        }

        // Create a unique request ID
        const requestId = `api_${Date.now()}`;

        // Send the image buffer to the inference worker
        inferenceWorker.send({
            type: 'detect_request',
            imageBuffer: req.file.buffer,
            requestId: requestId,
            streamId: 'api'
        });

        // Wait for detection result
        const detectionData = await new Promise((resolve, reject) => {
            // Listen for messages from the inference worker
            const handler = message => {
                if (message.type === 'detect_response' && message.requestId === requestId) {
                    inferenceWorker.removeListener('message', handler); // Clean up listener
                    if (message.error) {
                        reject(new Error(message.error));
                    } else {
                        resolve({
                            detections: message.detections,
                            annotatedImage: message.annotatedImage
                        });
                    }
                }
            };

            // Attach the message handler
            inferenceWorker.on('message', handler);
        });

        // Add the prefix to the annotated image if it exists
        if (detectionData.annotatedImage) {
            detectionData.annotatedImage = `data:image/jpeg;base64,${detectionData.annotatedImage}`;
        }

        // Send the response
        res.json({
            detections: detectionData.detections,
            annotatedImage: detectionData.annotatedImage,
            imageInfo: {
                filename: req.file.originalname,
                size: req.file.size
            }
        });
    } catch (error) {
        console.error('Error in object detection:', error);

        // Send error response
        res.status(500).json({
            error: 'Object detection failed',
            message: error.message
        });
    }
});

export default router;