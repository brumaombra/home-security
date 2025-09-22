import fetch from 'node-fetch';
import jpeg from 'jpeg-js';
import { detectMovement } from '../detection/movement-detection.js';

let streams = {}; // Object to hold multiple stream states

// Initialize and start multiple video stream processing
export const startStream = async config => {
    const { streamSources } = config;

    console.log('📹 Starting streams...');

    // Start each stream concurrently
    const streamPromises = streamSources.map(async (streamUrl, index) => {
        const streamId = `stream_${index}`;
        console.log(`📹 Starting stream ${streamId} from ${streamUrl}...`);

        try {
            const response = await fetch(streamUrl);
            console.log(`✅ Stream ${streamId} connection established successfully!`);

            // Initialize stream state
            streams[streamId] = {
                analyze: true,
                buffer: Buffer.alloc(0),
                url: streamUrl
            };

            // Process incoming data chunks for this stream
            response.body.on('data', async chunk => {
                const streamState = streams[streamId];
                if (!streamState || !streamState.analyze) return; // Skip processing if analysis is disabled

                // Append chunk to buffer
                streamState.buffer = Buffer.concat([streamState.buffer, chunk]);

                // Get boundary from Content-Type (assuming it's set)
                const contentType = response.headers.get('content-type');
                const boundaryMatch = contentType.match(/boundary=(.+)/);
                if (!boundaryMatch) return;
                const boundary = '--' + boundaryMatch[1];
                const boundaryBuffer = Buffer.from(boundary + '\r\n');
                const endBoundaryBuffer = Buffer.from('\r\n' + boundary);

                // Extract JPEG frames from the buffer
                let pos = 0;
                while ((pos = streamState.buffer.indexOf(boundaryBuffer, pos)) !== -1) {
                    const endPos = streamState.buffer.indexOf(endBoundaryBuffer, pos + boundaryBuffer.length);
                    if (endPos === -1) break; // Incomplete part

                    // Find the start of JPEG data (after headers)
                    const partStart = pos + boundaryBuffer.length;
                    const headerEnd = streamState.buffer.indexOf('\r\n\r\n', partStart);
                    if (headerEnd === -1) continue;
                    const jpegStart = headerEnd + 4;

                    // Extract JPEG
                    const jpegFrame = streamState.buffer.subarray(jpegStart, endPos);

                    // Decode and process
                    try {
                        const rawImage = jpeg.decode(jpegFrame, { useTArray: true });
                        await detectMovement({
                            image: rawImage,
                            cooldownTime: 2000,
                            framesToSkip: 5,
                            streamId: streamId
                        });
                    } catch (err) {
                        console.error(`❌ JPEG decode error for ${streamId}:`, err.message);
                    }

                    // Remove processed part
                    streamState.buffer = streamState.buffer.subarray(endPos + endBoundaryBuffer.length);
                    pos = 0;
                }
            });

            // Handle stream end
            response.body.on('end', () => {
                console.log(`🛑 Stream ${streamId} ended`);
                delete streams[streamId];
            });

            // Handle stream errors
            response.body.on('error', (err) => {
                console.error(`❌ Stream ${streamId} error:`, err.message);
                delete streams[streamId];
            });
        } catch (error) {
            console.error(`❌ Failed to start stream ${streamId}:`, error.message);
            throw error;
        }
    });

    // Wait for all streams to be initialized
    const results = await Promise.allSettled(streamPromises);

    // Check if all streams failed
    const allFailed = results.every(result => result.status === 'rejected');
    if (allFailed) {
        console.error('❌ All streams failed to initialize!');
        throw new Error('All streams failed to initialize!');
    }

    // Success message
    console.log('📹 All streams initialized!');
};

// Start the video stream analysis for all streams or a specific stream
export const startStreamAnalysis = (streamId = null) => {
    if (streamId) {
        if (streams[streamId]) {
            streams[streamId].analyze = true;
            console.log(`📹 Stream analysis started for ${streamId}!`);
        } else {
            console.warn(`⚠️ Stream ${streamId} not found`);
        }
    } else {
        Object.keys(streams).forEach(id => {
            streams[id].analyze = true;
        });
        console.log('📹 Stream analysis started for all streams!');
    }
};

// Stop the video stream analysis for all streams or a specific stream
export const stopStreamAnalysis = (streamId = null) => {
    if (streamId) {
        if (streams[streamId]) {
            streams[streamId].analyze = false;
            console.log(`🛑 Stream analysis stopped for ${streamId}!`);
        } else {
            console.warn(`⚠️ Stream ${streamId} not found`);
        }
    } else {
        Object.keys(streams).forEach(id => {
            streams[id].analyze = false;
        });
        console.log('🛑 Stream analysis stopped for all streams!');
    }
};