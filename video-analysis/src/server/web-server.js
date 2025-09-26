import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import eventsRouter from './routes/events.js';
import detectRouter from './routes/detect.js';
import streamsRouter from './routes/streams.js';
import logsRouter from './routes/logs.js';
import { printLog } from '../utils/utils.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for now, adjust as needed
        methods: ["GET", "POST"]
    }
});

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

// Socket.IO connection handling
io.on('connection', socket => {
    printLog(`Client connected: ${socket.id}`);

    // On client disconnect
    socket.on('disconnect', () => {
        printLog(`Client disconnected: ${socket.id}`);
    });
});

// Start the server
export const startServer = config => {
    // Make inference worker accessible in routes
    app.locals.inferenceWorker = config.inferenceWorker;

    // Make io accessible globally for emitting events
    global.io = io;

    // Start the server
    server.listen(config.serverPort, () => {
        printLog(`Server running on port ${config.serverPort}!`);
    });
};