import fs from 'fs';
import { addLog } from '../storage/logs.js';

// Round the percentage to two decimal places
export const roundPercentage = value => {
    if (!value || isNaN(value)) return 0;
    return Math.round(value * 100) / 100;
};

// Save a base64 image to a file
export const saveBase64ImageToFile = (base64Image, filename) => {
    try {
        // If filename is not provided, throw an error
        if (!filename) {
            throw new Error('Filename is required to save the image.');
        }

        // Save the image
        fs.writeFileSync(`public/images/${filename}`, base64Image, 'base64');
        printLog(`Saved detection image: ${filename}`);
        return filename;
    } catch (error) {
        printLog('Error saving detection image:', { type: 'error', error });
        throw error;
    }
};

// Save log function
export const printLog = (message, { type = 'info', error } = {}) => {
    // Create the log object
    const log = {
        id: `log_${Date.now()}`,
        timestamp: Date.now(),
        type: type,
        message: message,
        error: error ? error.toString() : null
    };

    // Add the log entry
    addLog(log);

    // Also print to console
    if (type === 'error') {
        console.error(message);
    } else {
        console.log(message);
    }
};