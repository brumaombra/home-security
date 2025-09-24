import express from 'express';
import { loadEvents } from '../../storage/storage.js';

const router = express.Router();

// Endpoint to list events
router.get('/', async (req, res) => {
    try {
        const events = loadEvents();
        res.json({ events });
    } catch (error) {
        console.error('Error loading events:', error);
        res.status(500).json({ error: 'Unable to load events' });
    }
});

export default router;