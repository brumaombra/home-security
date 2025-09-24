import { fork } from 'child_process';
import { addEvent } from '../storage/storage.js';

let workers = []; // Keep track of workers

// Start a worker process for every stream
export const startStreamWorkers = async config => {
    // Spawn workers for each stream
    config.streamSources?.forEach((streamUrl, index) => {
        const streamId = `stream_${index}`;
        const worker = fork('./src/stream/stream-worker.js', [], { stdio: 'inherit' });

        // Send initial message to worker
        worker.send({ streamUrl, streamId });

        // Handle messages from worker
        worker.on('message', message => {
            if (message.type === 'event') {
                addEvent(message.event); // Store event in main process
                console.log(`Event recorded from ${streamId}: ${message.event.detectionsCount} object(s) detected`);
            }
        });

        // Keep track of workers
        workers.push(worker);
    });
};

// Get the list of active workers
export const getActiveWorkers = () => {
    return workers;
};