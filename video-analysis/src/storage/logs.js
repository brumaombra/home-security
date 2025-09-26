import fs from 'fs';
import { printLog } from '../utils/utils.js';

// Load logs from logs.json
export const loadLogs = () => {
    try {
        // Check if file exists
        if (fs.existsSync('data/logs.json')) {
            const data = fs.readFileSync('data/logs.json', 'utf8');
            return JSON.parse(data);
        }

        // If file doesn't exist, return empty array
        return [];
    } catch (error) {
        printLog('Error loading logs:', { type: 'error', error });
        return [];
    }
};

// Save logs to logs.json
export const saveLogs = logs => {
    try {
        // Ensure the data directory exists
        fs.mkdirSync('data', { recursive: true });
        fs.writeFileSync('data/logs.json', JSON.stringify(logs, null, 2));
    } catch (error) {
        console.error('Error saving logs:', error); // Use console.error to avoid recursion
        throw error;
    }
};

// Add a new log
export const addLog = log => {
    const logs = loadLogs();
    logs.unshift(log); // Add to beginning for chronological order (newest first)
    if (logs.length > 1000) logs.splice(1000); // Keep only the last 1000 logs to prevent file from growing too large
    saveLogs(logs);
    return log;
};
