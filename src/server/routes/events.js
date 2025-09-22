import express from 'express';
import { loadEvents } from '../../storage/storage.js';

const router = express.Router();

// Endpoint to list events
router.get('/', async (req, res) => {
    try {
        const events = loadEvents(); // Load events from JSON file
        res.json({ events }); // Send the response
    } catch (error) {
        console.error('Error loading events:', error);
        res.status(500).json({ error: 'Unable to load events' });
    }
});

export default router;