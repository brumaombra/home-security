import { fork } from 'child_process';
import { addEvent } from '../storage/events.js';
import { notifyEventDetected } from '../websocket/websocket.js';
import { printLog } from '../utils/utils.js';

let streams = []; // Keep track of streams
let inferenceWorker = null; // Reference to the inference worker

// Helper function to create and setup a worker for a stream
const createWorkerForStream = stream => {
    // Fork a new worker process
    const worker = fork('./src/stream/stream-worker.js', [], { stdio: 'inherit' });

    // Send initial message to worker
    worker.send({ streamUrl: stream.streamUrl, streamId: stream.streamId });

    // Handle messages from worker
    worker.on('message', async message => {
        if (message.type === 'event') {
            addEvent(message.event); // Store event in main process
            printLog(`Event recorded from ${stream.streamId}: ${message.event.detectionsCount} object(s) detected`);

            // Notify connected clients about the detected event
            notifyEventDetected({
                streamId: stream.streamId,
                detectionsCount: message.event.detectionsCount,
                timestamp: message.event.timestamp
            });
        } else if (message.type === 'connected') {
            printLog(`Stream ${stream.streamId} connected successfully`);
            stream.status = 'active';
        } else if (message.type === 'detect_request') {
            inferenceWorker.send(message); // Forward detection request to inference worker
        }
    });

    // Handle worker exit
    worker.on('exit', code => {
        printLog(`Worker for ${stream.streamId} exited with code ${code}`);

        // Update stream status only if it was active or starting
        if (stream.status === 'active' || stream.status === 'starting') {
            stream.status = 'inactive';
        }
    });

    // Handle worker disconnect
    worker.on('disconnect', () => {
        printLog(`Worker for ${stream.streamId} disconnected`);

        // Update stream status only if it was active or starting
        if (stream.status === 'active' || stream.status === 'starting') {
            stream.status = 'inactive';
        }
    });

    // Handle worker error
    worker.on('error', error => {
        printLog(`Worker for ${stream.streamId} error:`, { type: 'error', error });

        // Update stream status only if it was active or starting
        if (stream.status === 'active' || stream.status === 'starting') {
            stream.status = 'inactive';
        }
    });

    return worker;
};

// Start a worker process for every stream
export const startStreamWorkers = async config => {
    // Save reference to the inference worker
    inferenceWorker = config.inferenceWorker;

    // Listen for messages from inference worker
    inferenceWorker.on('message', message => {
        if (message.type === 'detect_response') {
            // Find the stream worker that made the request
            const { requestId } = message;
            const streamId = requestId.split('_').slice(0, 2).join('_'); // e.g., stream_0
            const stream = streams.find(s => s.streamId === streamId);
            if (stream && stream.worker) {
                stream.worker.send(message);
            }
        }
    });

    // Spawn workers for each stream
    config.streamSources?.forEach((streamUrl, index) => {
        // Create stream object with initial status
        const stream = {
            streamId: `stream_${index}`,
            streamUrl: streamUrl,
            status: 'starting'
        };

        try {
            stream.worker = createWorkerForStream(stream); // Create worker and assign to stream
        } catch (error) {
            printLog(`Failed to start worker for ${stream.streamId}:`, { type: 'error', error });
            stream.status = 'inactive';
        }

        // Keep track of streams
        streams.push(stream);
    });
};

// Get the list of streams with status
export const getStreams = () => {
    return streams;
};

// Restart a specific stream
export const restartStream = streamId => {
    // Find the stream
    const stream = streams.find(s => s.streamId === streamId);
    if (!stream) {
        throw new Error(`Stream ${streamId} not found`);
    }

    // Kill existing worker
    if (stream.worker) {
        stream.worker.kill();
        stream.worker = null; // Clear the worker reference
    }

    // Set status to starting
    stream.status = 'starting';

    try {
        stream.worker = createWorkerForStream(stream); // Create new worker and update stream
    } catch (error) {
        printLog(`Failed to restart worker for ${stream.streamId}:`, { type: 'error', error });
        stream.status = 'inactive';
        throw error; // Re-throw to let API handle
    }

    // Return updated stream
    return stream;
};

// Stop a specific stream
export const stopStream = streamId => {
    // Find the stream
    const stream = streams.find(s => s.streamId === streamId);
    if (!stream) {
        throw new Error(`Stream ${streamId} not found`);
    }

    // Kill existing worker
    if (stream.worker) {
        stream.worker.kill();
        stream.worker = null; // Clear the worker reference
    }

    // Update status
    stream.status = 'inactive';

    // Return updated stream
    return stream;
};

// Create a new stream
export const createStream = streamUrl => {
    // Generate a unique streamId
    const streamId = `stream_${Date.now()}`;

    // Create stream object with initial status
    const stream = {
        streamId: streamId,
        streamUrl: streamUrl,
        status: 'starting'
    };

    try {
        stream.worker = createWorkerForStream(stream); // Create worker and assign to stream
    } catch (error) {
        printLog(`Failed to start worker for ${stream.streamId}:`, { type: 'error', error });
        stream.status = 'inactive';
    }

    // Add to streams array
    streams.push(stream);

    // Return the new stream
    return stream;
};

// Delete a specific stream
export const deleteStream = streamId => {
    // Find the stream index
    const streamIndex = streams.findIndex(s => s.streamId === streamId);
    if (streamIndex === -1) {
        throw new Error(`Stream ${streamId} not found`);
    }

    const stream = streams[streamIndex];

    // Kill existing worker if active
    if (stream.worker) {
        stream.worker.kill();
        stream.worker = null; // Clear the worker reference
    }

    // Remove from streams array
    streams.splice(streamIndex, 1);

    // Return the deleted stream info
    return { streamId, streamUrl: stream.streamUrl };
};