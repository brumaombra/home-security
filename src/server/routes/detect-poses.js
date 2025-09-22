import express from 'express';
import { getMulterUploadMiddleware } from '../multer.js';
import { detectPosesInImage } from '../../detection/pose-detection.js';

const router = express.Router();
const multerMiddleware = getMulterUploadMiddleware();

// Endpoint for pose detection
router.post('/', multerMiddleware, async (req, res) => {
    try {
        // Check if the file is provided
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' });
        }

        // Use the detectPosesInImage function
        const detectionData = await detectPosesInImage({
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
            poses: detectionData.poses,
            annotatedImage: detectionData.annotatedImage
        });
    } catch (error) {
        console.error('Error in pose detection:', error);

        // Send error response
        res.status(500).json({
            error: 'Pose detection failed',
            message: error.message
        });
    }
});

export default router;