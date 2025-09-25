import express from 'express';
import { loadLogs } from '../../storage/storage.js';
import { printLog } from '../../utils/utils.js';

const router = express.Router();

// Endpoint to list logs
router.get('/', async (req, res) => {
    try {
        // Retrieve logs with pagination
        const logs = loadLogs();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const paginatedLogs = logs.slice(offset, offset + limit);
        const totalLogs = logs.length;
        const totalPages = Math.ceil(totalLogs / limit);

        // Send the response
        res.json({
            results: paginatedLogs,
            pagination: {
                total: totalLogs,
                currentPage: page,
                totalPages: totalPages,
                limit,
                hasMore: totalLogs > page * limit
            }
        });
    } catch (error) {
        printLog('Error loading logs:', { type: 'error', error });
        res.status(500).json({ error: 'Unable to load logs' });
    }
});

export default router;