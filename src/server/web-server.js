import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import eventsRouter from './routes/events.js';
import detectRouter from './routes/detect.js';
import detectPosesRouter from './routes/detect-poses.js';

const app = express();

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
app.use('/api/detect-poses', detectPosesRouter);

// Start the server
export const startServer = config => {
    app.listen(config.serverPort, () => {
        console.log(`🚀 Server running on port ${config.serverPort}`);
    });
};