import { Jimp } from 'jimp';
import { createCanvas, loadImage } from 'canvas';
import { createTensorFromImage } from '../tensorflow/tensorflow.js';
import { printLog } from '../utils/utils.js';

// Convert image buffer to tensor
export const processImage = async ({ imageBuffer, resize = false, maxWidth = 1024, maxHeight = 1024 }) => {
    try {
        // Use Jimp to process the image
        const image = await Jimp.read(imageBuffer);

        // Resize image if too large (optional, for performance)
        if (resize && (image.width > maxWidth || image.height > maxHeight)) {
            image.scaleToFit({ w: maxWidth, h: maxHeight });
        }

        // Convert to RGB format and get pixel data
        const { data, width, height } = image.bitmap;

        // Convert RGBA to RGB (remove alpha channel)
        const rgbData = new Uint8Array(width * height * 3);
        for (let i = 0; i < width * height; i++) {
            rgbData[i * 3] = data[i * 4]; // R
            rgbData[i * 3 + 1] = data[i * 4 + 1]; // G
            rgbData[i * 3 + 2] = data[i * 4 + 2]; // B
        }

        // Return processed image data
        const tensor = createTensorFromImage({ rgbData, width, height });
        return { tensor, width, height, originalImage: image };
    } catch (error) {
        printLog('Error processing image:', { type: 'error', error });
        throw error;
    }
};

// Draw bounding boxes and labels on image
export const drawDetections = async (image, predictions) => {
    try {
        printLog(`Drawing detections on image: ${image.width}x${image.height}, ${predictions.length} predictions`);

        // Get image buffer
        const imageBuffer = await image.getBuffer('image/png');

        // Load into canvas
        const img = await loadImage(imageBuffer);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        // Draw the original image
        ctx.drawImage(img, 0, 0);

        // Define colors for different object classes
        const colors = [
            'rgba(255, 0, 0, 1)', // Red
            'rgba(0, 255, 0, 1)', // Green  
            'rgba(0, 0, 255, 1)', // Blue
            'rgba(255, 255, 0, 1)', // Yellow
            'rgba(255, 0, 255, 1)', // Magenta
            'rgba(0, 255, 255, 1)', // Cyan
            'rgba(255, 165, 0, 1)', // Orange
            'rgba(128, 0, 128, 1)', // Purple
        ];

        // Loop through predictions and draw them
        predictions.forEach((prediction, index) => {
            const { bbox, class: className, score } = prediction;
            const [x, y, width, height] = bbox;

            // Get color for this detection
            const color = colors[index % colors.length];

            // Draw bounding box
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);

            // Draw label with background
            const label = `${className} ${Math.round(score * 100)}%`;
            ctx.font = '18px Arial';
            const textMetrics = ctx.measureText(label);
            const labelWidth = textMetrics.width + 12;
            const labelHeight = 28;

            // Label background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.fillRect(x, y, labelWidth, labelHeight);

            // Label text
            ctx.fillStyle = 'white';
            ctx.fillText(label, x + 6, y + 20); // Centered position
        });

        // Get canvas buffer and load back into Jimp
        const annotatedBuffer = canvas.toBuffer('image/png');
        const annotatedImage = await Jimp.read(annotatedBuffer);

        printLog(`Drawing complete. Annotated image dimensions: ${annotatedImage.width}x${annotatedImage.height}`);
        return annotatedImage;
    } catch (error) {
        printLog('Error drawing detections:', { type: 'error', error });
        throw error;
    }
};

// Convert Jimp image to base64 string
export const imageToBase64 = async image => {
    try {
        // Get image buffer in JPEG format
        const imageBuffer = await image.getBuffer('image/jpeg');
        if (!imageBuffer) {
            throw new Error('getBuffer returned null or undefined');
        }

        // Convert buffer to base64 string
        const base64Image = await imageBuffer.toString('base64');
        return base64Image;
    } catch (error) {
        printLog('Error converting image to base64:', { type: 'error', error });
        throw error;
    }
};