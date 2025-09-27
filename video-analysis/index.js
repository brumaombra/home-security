import dotenv from 'dotenv';
import { startStreamWorkers } from './src/stream/stream.js';
import { startServer } from './src/server/web-server.js';
import { printLog } from './src/utils/utils.js';

// Load environment variables from .env file
dotenv.config();

// Configuration settings
const config = {
    serverPort: process.env.SERVER_PORT, // Port for the web server
    streamSources: [], // Array of URLs for MJPEG streams
};

// Check the env variables
const checkEnvVariables = () => {
    const requiredEnvVars = ['SERVER_PORT'];
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            printLog(`${varName} is not defined in environment variables!`, { type: 'error' });
            process.exit(1);
        }
    });
};

// Initialize the app
const initApp = async config => {
    try {
        // Check environment variables
        checkEnvVariables();

        // Start the application
        printLog('Starting the application...');
        await startStreamWorkers(config); // Start stream workers
        startServer(config); // Start the server
    } catch (error) {
        printLog('Error initializing app:', { type: 'error', error });
        process.exit(1);
    }
};

// Initialize the app
initApp(config);