import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

let objectDetectionModel = null; // COCO-SSD model instance

// Initialize TensorFlow.js
export const initTensorFlow = async () => {
    try {
        console.log('Initializing TensorFlow...');
        await tf.ready(); // Ensure TensorFlow.js is ready
        console.log('TensorFlow is ready!');
    } catch (error) {
        console.error('Error initializing TensorFlow:', error);
        throw error;
    }
};

// Load the COCO-SSD model
export const loadObjectDetectionModel = async () => {
    try {
        console.log('Loading COCO-SSD model...');
        objectDetectionModel = await cocoSsd.load(); // Load the model
        console.log('COCO-SSD model loaded successfully!');
    } catch (error) {
        console.error('Error loading model:', error);
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