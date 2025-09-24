import { fork } from 'child_process';
import { addEvent } from '../storage/storage.js';

let streams = []; // Keep track of streams

// Start a worker process for every stream
export const startStreamWorkers = async config => {
    // Spawn workers for each stream
    config.streamSources?.forEach((streamUrl, index) => {
        const streamId = `stream_${index}`;
        const worker = fork('./src/stream/stream-worker.js', [], { stdio: 'inherit' });

        // Create stream object with initial status
        const stream = {
            streamId,
            streamUrl,
            status: 'active',
            worker
        };

        // Send initial message to worker
        worker.send({ streamUrl, streamId });

        // Handle messages from worker
        worker.on('message', message => {
            if (message.type === 'event') {
                addEvent(message.event); // Store event in main process
                console.log(`Event recorded from ${streamId}: ${message.event.detectionsCount} object(s) detected`);
            }
        });

        // Handle worker exit
        worker.on('exit', code => {
            console.log(`Worker for ${streamId} exited with code ${code}`);
            stream.status = 'inactive';
        });

        // Handle worker disconnect
        worker.on('disconnect', () => {
            console.log(`Worker for ${streamId} disconnected`);
            stream.status = 'inactive';
        });

        // Handle worker error
        worker.on('error', error => {
            console.error(`Worker for ${streamId} error:`, error);
            stream.status = 'inactive';
        });

        // Keep track of streams
        streams.push(stream);
    });
};

// Get the list of streams with status
export const getStreams = () => {
    return streams;
};