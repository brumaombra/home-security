import express from 'express';
import { getStreams, restartStream, stopStream, createStream, deleteStream } from '../../stream/stream.js';

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

// Endpoint to create a new stream
router.post('/', async (req, res) => {
    try {
        // Verify required fields
        const { streamUrl } = req.body;
        if (!streamUrl) {
            return res.status(400).json({ error: 'streamUrl is required' });
        }

        // Create the stream
        const stream = createStream(streamUrl);
        res.status(201).json({ message: 'Stream created successfully', stream });
    } catch (error) {
        console.error('Error creating stream:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to restart a specific stream
router.post('/:streamId/restart', async (req, res) => {
    try {
        const { streamId } = req.params;
        const stream = restartStream(streamId);
        res.json({ message: `Stream ${streamId} restarted successfully`, stream });
    } catch (error) {
        console.error('Error restarting stream:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to stop a specific stream
router.post('/:streamId/stop', async (req, res) => {
    try {
        const { streamId } = req.params;
        const stream = stopStream(streamId);
        res.json({ message: `Stream ${streamId} stopped successfully`, stream });
    } catch (error) {
        console.error('Error stopping stream:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to delete a specific stream
router.delete('/:streamId', async (req, res) => {
    try {
        const { streamId } = req.params;
        const deletedStream = deleteStream(streamId);
        res.json({ message: `Stream ${streamId} deleted successfully`, deletedStream });
    } catch (error) {
        console.error('Error deleting stream:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;