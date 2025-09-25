import dotenv from 'dotenv';
import { fork } from 'child_process';
import { startStreamWorkers } from './src/stream/stream.js';
import { startServer } from './src/server/web-server.js';

// Load environment variables from .env file
dotenv.config();

// Configuration settings
const config = {
    serverPort: process.env.SERVER_PORT, // Port for the web server
    streamSources: ['http://192.168.21.117:8080/video'], // Array of URLs for MJPEG streams
    inferenceWorker: null // Placeholder for inference worker
};

// Check the env variables
const checkEnvVariables = () => {
    const requiredEnvVars = ['SERVER_PORT'];
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            console.error(`${varName} is not defined in environment variables!`);
            process.exit(1);
        }
    });
};

// Initialize the app
const initApp = async config => {
    try {
        // Check environment variables
        checkEnvVariables();

        // Start the inference worker
        console.log('Starting inference worker...');
        const inferenceWorker = fork('./src/tensorflow/inference-worker.js', [], { stdio: 'inherit' });
        config.inferenceWorker = inferenceWorker;

        // Start the application
        console.log('Starting the application...');
        await startStreamWorkers(config); // Start stream workers
        startServer(config); // Start the server
    } catch (error) {
        console.error('Error initializing app:', error);
        process.exit(1);
    }
};

// Initialize the app
initApp(config);