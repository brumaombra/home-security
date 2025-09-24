import express from 'express';
import { getStreams } from '../../stream/stream.js';

const router = express.Router();

// Endpoint to list streams
router.get('/', async (req, res) => {
    try {
        const streams = getStreams();
        res.json({ streams });
    } catch (error) {
        console.error('Error loading streams:', error);
        res.status(500).json({ error: 'Unable to load streams' });
    }
});

export default router;