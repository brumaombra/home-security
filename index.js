import { initTensorFlow, loadObjectDetectionModel } from './src/tensorflow/tensorflow.js';
import { startStream } from './src/stream/stream.js';
import { startServer } from './src/server/web-server.js';

// Configuration settings
const config = {
    serverPort: 4000, // Port for the web server
    streamSources: [ // Array of URLs for MJPEG streams
        'http://192.168.21.117:8080/video',
        'http://192.168.21.144:8080/video',
        'http://192.168.21.102:8080/video'
    ]
};

// Initialize the app
const initApp = async config => {
    try {
        console.log('🚀 Starting the application...');
        await initTensorFlow(); // Initialize TensorFlow.js
        await loadObjectDetectionModel(); // Load the object detection model
        await startStream(config); // Start the stream
        startServer(config); // Start the server
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        process.exit(1);
    }
};

// Initialize the app
initApp(config);