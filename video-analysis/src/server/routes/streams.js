import express from 'express';
import { getStreams } from '../../stream/stream.js';

const router = express.Router();

// Endpoint to list streams
router.get('/', async (req, res) => {
    try {
        // Retrieve streams with pagination
        const streams = getStreams();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const paginatedStreams = streams.slice(offset, offset + limit);
        const totalStreams = streams.length;
        const totalPages = Math.ceil(totalStreams / limit);

        // Send the response
        res.json({
            results: paginatedStreams,
            pagination: {
                total: totalStreams,
                currentPage: page,
                totalPages: totalPages,
                limit,
                hasMore: totalStreams > page * limit
            }
        });
    } catch (error) {
        console.error('Error loading streams:', error);
        res.status(500).json({ error: 'Unable to load streams' });
    }
});

export default router;