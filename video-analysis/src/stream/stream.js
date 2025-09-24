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
        }
    });

    // Handle worker exit
    worker.on('exit', code => {
        console.log(`Worker for ${stream.streamId} exited with code ${code}`);
        stream.status = 'inactive';
    });

    // Handle worker disconnect
    worker.on('disconnect', () => {
        console.log(`Worker for ${stream.streamId} disconnected`);
        stream.status = 'inactive';
    });

    // Handle worker error
    worker.on('error', error => {
        console.error(`Worker for ${stream.streamId} error:`, error);
        stream.status = 'inactive';
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
            status: 'active'
        };

        // Create worker and assign to stream
        stream.worker = createWorkerForStream(stream);
        streams.push(stream); // Keep track of streams
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
    }

    // Create new worker and update stream
    stream.worker = createWorkerForStream(stream);
    stream.status = 'active';

    // Return updated stream
    return stream;
};