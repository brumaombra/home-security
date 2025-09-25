import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { printLog } from '../utils/utils.js';

let objectDetectionModel = null; // COCO-SSD model instance

// Initialize TensorFlow.js
export const initTensorFlow = async streamId => {
    try {
        printLog(`Initializing TensorFlow for stream ${streamId}...`);
        await tf.ready(); // Ensure TensorFlow.js is ready
        printLog(`TensorFlow is ready for stream ${streamId}!`);
    } catch (error) {
        printLog(`Error initializing TensorFlow for stream ${streamId}:`, { type: 'error', error });
        throw error;
    }
};

// Load the COCO-SSD model
export const loadObjectDetectionModel = async streamId => {
    try {
        printLog(`Loading COCO-SSD model for stream ${streamId}...`);
        objectDetectionModel = await cocoSsd.load(); // Load the model
        printLog(`COCO-SSD model loaded successfully for stream ${streamId}!`);
    } catch (error) {
        printLog(`Error loading model for stream ${streamId}:`, { type: 'error', error });
        throw error;
    }
};

// Perform object detection on the input tensor
export const detectObjects = async inputTensor => {
    // Check if model is loaded
    if (!objectDetectionModel) {
        throw new Error('Model not loaded');
    }

    // Perform object detection
    const predictions = await objectDetectionModel.detect(inputTensor); // Inference through model
    return predictions; // Return predictions
};

// Create a tensor from the image buffer
export const createTensorFromImage = ({ rgbData, width, height }) => {
    const tensor = tf.tensor3d(rgbData, [height, width, 3]);
    return tensor;
};