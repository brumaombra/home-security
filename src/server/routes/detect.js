import express from 'express';
import { getMulterUploadMiddleware } from '../multer.js';
import { detectObjectsInImage } from '../../detection/object-detection.js';

const router = express.Router();
const multerMiddleware = getMulterUploadMiddleware();

// Endpoint for object detection
router.post('/', multerMiddleware, async (req, res) => {
    try {
        // Check if the file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Use the detectObjectsInImage function
        const detectionData = await detectObjectsInImage({
            imageBuffer: req.file.buffer,
            generateImage: req.body.generateImage === 'true'
        });

        // Add the prefix to the annotated image if it exists
        if (detectionData.annotatedImage) {
            detectionData.annotatedImage = `data:image/jpeg;base64,${detectionData.annotatedImage}`;
        }

        // Send the response
        res.json({
            imageInfo: {
                width: detectionData.imageInfo.width,
                height: detectionData.imageInfo.height,
                filename: req.file.originalname,
                size: req.file.size
            },
            detections: detectionData.detections,
            annotatedImage: detectionData.annotatedImage
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