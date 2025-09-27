import express from 'express';
import { getMulterUploadMiddleware } from '../multer.js';
import { detectObjectsInImage } from '../../detection/object-detection.js';
import { printLog } from '../../utils/utils.js';

const router = express.Router();
const multerMiddleware = getMulterUploadMiddleware();

// Endpoint for object detection
router.post('/', multerMiddleware, async (req, res) => {
    try {
        // Check if the file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Process detection
        const detectionData = await detectObjectsInImage({ imageBuffer: req.file.buffer });

        // Add the prefix to the annotated image if it exists
        if (detectionData.annotatedImage) {
            detectionData.annotatedImage = `data:image/jpeg;base64,${detectionData.annotatedImage}`;
        }

        // Send the response
        res.json({
            detectionData: detectionData.detectionData,
            annotatedImage: detectionData.annotatedImage,
            imageInfo: {
                filename: req.file.originalname,
                size: req.file.size,
                height: detectionData.imageInfo.height,
                width: detectionData.imageInfo.width
            }
        });
    } catch (error) {
        printLog('Error in object detection:', { type: 'error', error });

        // Send error response
        res.status(500).json({
            error: 'Object detection failed',
            message: error.message
        });
    }
});

export default router;