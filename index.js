import { initTensorFlow, loadObjectDetectionModel, loadPoseDetectionModel } from './src/tensorflow/tensorflow.js';
import { startServer } from './src/server/web-server.js';
import { startStream } from './src/stream/stream.js';

// Initialize the app
const initApp = async () => {
    try {
        console.log('🚀 Starting the application...');
        await initTensorFlow(); // Initialize TensorFlow.js
        await loadObjectDetectionModel(); // Load the model
        await startStream(); // Start the stream
        // await loadPoseDetectionModel(); // Load the pose detection model
        // startServer(); // Start the server
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        process.exit(1);
    }
};

// Initialize the app
initApp();