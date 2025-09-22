import fetch from 'node-fetch';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const streamUrl = 'http://192.168.1.50:8080/video';
let lastFrame = null;

// Initialize and start the video stream processing
export const startStream = async () => {
    // Fetch the MJPEG stream
    console.log('🚀 Starting stream...');
    const response = await fetch(streamUrl);
    console.log('📡 Stream connection established successfully!');
    let buffer = Buffer.alloc(0);

    // Process incoming data chunks
    response.body.on('data', chunk => {
        // Append chunk to buffer
        buffer = Buffer.concat([buffer, chunk]);
        const start = buffer.indexOf(Buffer.from([0xff, 0xd8]));
        const end = buffer.indexOf(Buffer.from([0xff, 0xd9]));

        // Extract complete JPEG frame
        if (start !== -1 && end !== -1 && end > start) {
            const jpegFrame = buffer.slice(start, end + 2);
            buffer = buffer.slice(end + 2);

            // Decode JPEG to raw image
            const rawImage = jpeg.decode(jpegFrame, { useTArray: true });

            // Process the frame for movement detection
            detectMovement(rawImage);
        }
    });
};

// Detect movement between frames
const detectMovement = rawImage => {
    // Convert raw image to PNG format
    const pngFrame = new PNG({ width: rawImage.width, height: rawImage.height });
    pngFrame.data = rawImage.data;

    // If there's a previous frame, compare it with the current one
    if (lastFrame) {
        const diff = new PNG({ width: rawImage.width, height: rawImage.height });

        // Compare the two frames
        const numDiffPixels = pixelmatch(
            lastFrame.data,
            pngFrame.data,
            diff.data,
            rawImage.width,
            rawImage.height,
            { threshold: 0.1 }
        );

        // If the number of different pixels exceeds a threshold, log movement
        if (numDiffPixels > 5000) {
            console.log('⚠️ Movimento rilevato!');
        }
    }

    // Update last frame
    lastFrame = pngFrame;
};