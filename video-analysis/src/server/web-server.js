import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { initWebSocket } from '../websocket/websocket.js';
import { printLog } from '../utils/utils.js';
import eventsRouter from './routes/events.js';
import detectRouter from './routes/detect.js';
import streamsRouter from './routes/streams.js';
import logsRouter from './routes/logs.js';

const app = express();
const server = createServer(app);

// Initialize WebSocket server
initWebSocket(server);

// Get the current file and directory names
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/detect', detectRouter);
app.use('/api/streams', streamsRouter);
app.use('/api/logs', logsRouter);

// Start the server
export const startServer = config => {
    // Start the server
    server.listen(config.serverPort, () => {
        printLog(`Server running on port ${config.serverPort}!`);
    });
};