import fetch from 'node-fetch';
import jpeg from 'jpeg-js';
import { detectMovement } from '../detection/movement-detection.js';

const streamUrl = 'http://192.168.21.117:8080/video'; // URL of the MJPEG stream
let analyzeStream = true; // Flag to control analysis

// Initialize and start the video stream processing
export const startStream = async () => {
    // Fetch the MJPEG stream
    console.log('📹 Starting stream...');
    const response = await fetch(streamUrl);
    console.log('✅ Stream connection established successfully!');
    let buffer = Buffer.alloc(0);

    // Process incoming data chunks
    response.body.on('data', async chunk => {
        if (!analyzeStream) return; // Skip processing if analysis is disabled

        // Append chunk to buffer
        buffer = Buffer.concat([buffer, chunk]);

        // Get boundary from Content-Type (assuming it's set)
        const contentType = response.headers.get('content-type');
        const boundaryMatch = contentType.match(/boundary=(.+)/);
        if (!boundaryMatch) return;
        const boundary = '--' + boundaryMatch[1];
        const boundaryBuffer = Buffer.from(boundary + '\r\n');
        const endBoundaryBuffer = Buffer.from('\r\n' + boundary);

        let pos = 0;
        while ((pos = buffer.indexOf(boundaryBuffer, pos)) !== -1) {
            const endPos = buffer.indexOf(endBoundaryBuffer, pos + boundaryBuffer.length);
            if (endPos === -1) break; // Incomplete part

            // Find the start of JPEG data (after headers)
            const partStart = pos + boundaryBuffer.length;
            const headerEnd = buffer.indexOf('\r\n\r\n', partStart);
            if (headerEnd === -1) continue;
            const jpegStart = headerEnd + 4;

            // Extract JPEG
            const jpegFrame = buffer.subarray(jpegStart, endPos);

            // Decode and process
            try {
                const rawImage = jpeg.decode(jpegFrame, { useTArray: true });
                await detectMovement(rawImage);
            } catch (err) {
                console.error('❌ JPEG decode error:', err.message);
            }

            // Remove processed part
            buffer = buffer.subarray(endPos + endBoundaryBuffer.length);
            pos = 0;
        }
    });
};

// Start the video stream analysis
export const startStreamAnalysis = () => {
    analyzeStream = true; // Flag to start analysis
    console.log('📹 Stream analysis started!');
};

// Stop the video stream analysis
export const stopStreamAnalysis = () => {
    analyzeStream = false; // Flag to stop analysis
    console.log('🛑 Stream analysis stopped!');
};