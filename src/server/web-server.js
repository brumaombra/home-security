import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getMulterUploadMiddleware } from './multer.js';
import { detectObjects, detectPoses } from '../tensorflow/tensorflow.js';
import { processImage, drawDetections, drawPoses, imageToBase64 } from '../image/image.js';
import { roundPercentage } from '../utils/utils.js';

let app; // Express app instance
const PORT = process.env.PORT || 4000;

// Configure the server
export const initServer = () => {
    // Get the current file and directory names
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Get the multer upload middleware
    const multerMiddleware = getMulterUploadMiddleware();

    // Initialize the express app
    app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../public')));

    // Root endpoint
    app.get('/', (req, res) => {
        // Serve the static content
    });

    // Object detection endpoint
    app.post('/detect', multerMiddleware, async (req, res) => {
        try {
            // Check if the file is provided
            if (!req.file) {
                return res.status(400).json({ error: 'No image file provided' });
            }

            // Extract image information
            console.log(`Processing image: ${req.file.originalname} (${req.file.size} bytes)`);
            const { tensor, width, height, originalImage } = await processImage({ imageBuffer: req.file.buffer, resize: true }); // Process the uploaded image
            const predictions = await detectObjects(tensor); // Perform object detection
            tensor.dispose(); // Clean up tensor to free memory
            console.log(`Found ${predictions.length} objects`);

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
            if (req.body.generateImage === 'true') {
                try {
                    console.log('Generating annotated image with detections');
                    const annotatedImage = await drawDetections(originalImage, predictions); // Draw detections on image
                    const base64Image = await imageToBase64(annotatedImage); // Convert annotated image to base64
                    base64ImageWithDetections = `data:image/jpeg;base64,${base64Image}`; // Prepare data URL
                } catch (error) {
                    console.error('Error generating annotated image:', error);
                    throw new Error('Failed to generate annotated image');
                }
            }

            // Send the response
            res.json({
                imageInfo: {
                    width: width,
                    height: height,
                    filename: req.file.originalname,
                    size: req.file.size
                },
                detections: results,
                annotatedImage: base64ImageWithDetections
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

            // Extract image information
            console.log(`Processing image for pose detection: ${req.file.originalname} (${req.file.size} bytes)`);
            const { tensor, width, height, originalImage } = await processImage({ imageBuffer: req.file.buffer, resize: true }); // Process the uploaded image
            const poses = await detectPoses(tensor); // Perform pose detection
            tensor.dispose(); // Clean up tensor to free memory
            console.log(`Found ${poses.length} poses`);

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
            if (req.body.generateImage === 'true') {
                try {
                    console.log('Generating annotated image with poses');
                    const annotatedImage = await drawPoses(originalImage, poses); // Draw poses on image
                    const base64Image = await imageToBase64(annotatedImage); // Convert annotated image to base64
                    base64ImageWithPoses = `data:image/jpeg;base64,${base64Image}`; // Prepare data URL
                } catch (error) {
                    console.error('Error generating annotated image:', error);
                    throw new Error('Failed to generate annotated image');
                }
            }

            // Send the response
            res.json({
                imageInfo: {
                    width: width,
                    height: height,
                    filename: req.file.originalname,
                    size: req.file.size
                },
                poses: results,
                annotatedImage: base64ImageWithPoses
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
};

// Start the server
export const startServer = async () => {
    // Initialize the server
    initServer();

    // Start the server
    app.listen(PORT, () => {
        console.log(`Object recognition server running on port ${PORT}`);
    });
};