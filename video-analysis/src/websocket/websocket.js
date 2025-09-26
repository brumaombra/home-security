import { Server } from 'socket.io';
import { printLog } from '../utils/utils.js';

let io = null; // Socket.IO server instance

// Initialize the WebSocket server
export const initWebSocket = server => {
    // Create Socket.IO server
    io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins for now, adjust as needed
            methods: ["GET", "POST"]
        }
    });

    // Handle client connections
    io.on('connection', socket => {
        printLog(`Client connected: ${socket.id}`);

        // On client disconnect
        socket.on('disconnect', () => {
            printLog(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

// Send the event notification to all connected clients
export const notifyEventDetected = ({ streamId, detectionsCount, timestamp }) => {
    if (!io) return; // Ensure io is initialized

    // Emit the event-detected event
    io.emit('event-detected', {
        streamId: streamId,
        detectionsCount: detectionsCount,
        timestamp: timestamp
    });
};

// Get the WebSocket server instance
export const getWebSocketInstance = () => {
    return io;
};