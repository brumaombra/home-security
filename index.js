import { initTensorFlow, loadObjectDetectionModel, loadPoseDetectionModel } from './src/tensorflow/tensorflow.js';
import { startStream } from './src/stream/stream.js';
import { startServer } from './src/server/web-server.js';

// Configuration settings
const config = {
    detectionType: 'object', // 'object' or 'pose'
    streamSources: ['http://192.168.21.117:8080/video'], // Array of URLs for MJPEG streams
    serverPort: 4000 // Port for the web server
};

// Initialize the app
const initApp = async config => {
    try {
        console.log('🚀 Starting the application...');

        // Initialize TensorFlow.js
        await initTensorFlow();

        // Load the appropriate model based on detection type
        if (config.detectionType === 'object') {
            await loadObjectDetectionModel(); // Load object detection model
        } else if (config.detectionType === 'pose') {
            await loadPoseDetectionModel(); // Load pose detection model
        }

        // Start the stream
        await startStream(config);

        // Start the server
        startServer(config);
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        process.exit(1);
    }
};

// Initialize the app
initApp(config);