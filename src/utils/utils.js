import fs from 'fs';

// Round the percentage to two decimal places
export const roundPercentage = value => {
    if (!value || isNaN(value)) return 0;
    return Math.round(value * 100) / 100;
};

// Save a base64 image to a file
export const saveBase64ImageToFile = (base64Image, streamId = null) => {
    try {
        const timestamp = Date.now();
        const streamSuffix = streamId ? `_${streamId}` : '';
        const filename = `detection_${timestamp}${streamSuffix}.jpg`;
        fs.writeFileSync(`public/images/${filename}`, base64Image, 'base64');
        console.log(`Saved detection image: ${filename}`);
        return filename;
    } catch (error) {
        console.error('Error saving detection image:', error);
        throw error;
    }
};