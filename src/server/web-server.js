import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { getMulterUploadMiddleware } from './multer.js';
import { detectObjectsInImage } from '../detection/object-detection.js';
import { detectPosesInImage } from '../detection/pose-detection.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Get the current file and directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the multer upload middleware
const multerMiddleware = getMulterUploadMiddleware();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../../images')));

// Root endpoint - serve the gallery
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/gallery.html'));
});

// API endpoint to get list of images
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, '../../images');

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read images directory' });
        }

        // Filter for image files and sort by timestamp (newest first)
        const imageFiles = files
            .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
            .sort((a, b) => {
                // Extract timestamp from filename (detection_1758536410022.jpg)
                const getTimestamp = (filename) => {
                    const match = filename.match(/detection_(\d+)\.jpg/);
                    return match ? parseInt(match[1]) : 0;
                };
                return getTimestamp(b) - getTimestamp(a);
            });

        res.json({ images: imageFiles });
    });
});

// Object detection endpoint
app.post('/detect', multerMiddleware, async (req, res) => {
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

// Pose detection endpoint
app.post('/detect-poses', multerMiddleware, async (req, res) => {
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

// Start the server
export const startServer = () => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};