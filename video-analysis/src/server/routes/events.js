import express from 'express';
import { loadEvents } from '../../storage/storage.js';

const router = express.Router();

// Endpoint to list events
router.get('/', async (req, res) => {
    try {
        // Retrieve events with pagination
        const events = loadEvents();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const paginatedEvents = events.slice(offset, offset + limit);
        const totalEvents = events.length;
        const totalPages = Math.ceil(totalEvents / limit);

        // Send the response
        res.json({
            results: paginatedEvents,
            pagination: {
                total: totalEvents,
                currentPage: page,
                totalPages: totalPages,
                limit,
                hasMore: totalEvents > page * limit
            }
        });
    } catch (error) {
        console.error('Error loading events:', error);
        res.status(500).json({ error: 'Unable to load events' });
    }
});

export default router;