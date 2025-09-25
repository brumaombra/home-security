import { fork } from 'child_process';
import { addEvent } from '../storage/storage.js';

let streams = []; // Keep track of streams

// Helper function to create and setup a worker for a stream
const createWorkerForStream = stream => {
    // Fork a new worker process
    const worker = fork('./src/stream/stream-worker.js', [], { stdio: 'inherit' });

    // Send initial message to worker
    worker.send({ streamUrl: stream.streamUrl, streamId: stream.streamId });

    // Handle messages from worker
    worker.on('message', message => {
        if (message.type === 'event') {
            addEvent(message.event); // Store event in main process
            console.log(`Event recorded from ${stream.streamId}: ${message.event.detectionsCount} object(s) detected`);
        } else if (message.type === 'connected') {
            console.log(`Stream ${stream.streamId} connected successfully`);
            stream.status = 'active';
        }
    });

    // Handle worker exit
    worker.on('exit', code => {
        console.log(`Worker for ${stream.streamId} exited with code ${code}`);

        // Update stream status only if it was active or starting
        if (stream.status === 'active' || stream.status === 'starting') {
            stream.status = 'inactive';
        }
    });

    // Handle worker disconnect
    worker.on('disconnect', () => {
        console.log(`Worker for ${stream.streamId} disconnected`);

        // Update stream status only if it was active or starting
        if (stream.status === 'active' || stream.status === 'starting') {
            stream.status = 'inactive';
        }
    });

    // Handle worker error
    worker.on('error', error => {
        console.error(`Worker for ${stream.streamId} error:`, error);

        // Update stream status only if it was active or starting
        if (stream.status === 'active' || stream.status === 'starting') {
            stream.status = 'inactive';
        }
    });

    return worker;
};

// Start a worker process for every stream
export const startStreamWorkers = async config => {
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
            console.error(`Failed to start worker for ${stream.streamId}:`, error);
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
        console.error(`Failed to restart worker for ${stream.streamId}:`, error);
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