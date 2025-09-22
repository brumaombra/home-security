import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Endpoint to list images
router.get('/', async (req, res) => {
    // Directory where images are stored
    const imagesDir = path.join(__dirname, '../../../public/images');

    try {
        // Read the images directory
        const files = await fs.promises.readdir(imagesDir);

        // Filter for image files
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

        // Get stats for each file to sort by modification time
        const filesWithStats = await Promise.all(
            imageFiles.map(async (file) => {
                const filePath = path.join(imagesDir, file);
                const stats = await fs.promises.stat(filePath);
                return { file, mtime: stats.mtime };
            })
        );

        // Sort by modification time (newest first)
        filesWithStats.sort((a, b) => b.mtime - a.mtime);

        // Create response with filename and timestamp
        const imagesWithTimestamps = filesWithStats.map(item => ({
            filename: item.file,
            timestamp: item.mtime.getTime()
        }));

        // Send the response
        res.json({ images: imagesWithTimestamps });
    } catch (error) {
        console.error('Error reading images directory:', error);
        res.status(500).json({ error: 'Unable to read images directory' });
    }
});

export default router;