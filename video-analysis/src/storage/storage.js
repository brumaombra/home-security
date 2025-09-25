import fs from 'fs';
import { printLog } from '../utils/utils.js';

// Load events from events.json
export const loadEvents = () => {
    try {
        // Check if file exists
        if (fs.existsSync('events.json')) {
            const data = fs.readFileSync('events.json', 'utf8');
            return JSON.parse(data);
        }

        // If file doesn't exist, return empty array
        return [];
    } catch (error) {
        printLog('Error loading events:', { type: 'error', error });
        return [];
    }
};

// Save events to events.json
export const saveEvents = events => {
    try {
        fs.writeFileSync('events.json', JSON.stringify(events, null, 2));
        printLog(`Saved ${events.length} events to events.json`);
    } catch (error) {
        printLog('Error saving events:', { type: 'error', error });
        throw error;
    }
};

// Add a new event
export const addEvent = event => {
    const events = loadEvents();
    events.unshift(event); // Add to beginning for chronological order (newest first)
    if (events.length > 1000) events.splice(1000); // Keep only the last 1000 events to prevent file from growing too large
    saveEvents(events);
    return event;
};

// Load logs from logs.json
export const loadLogs = () => {
    try {
        // Check if file exists
        if (fs.existsSync('logs.json')) {
            const data = fs.readFileSync('logs.json', 'utf8');
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
        fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2));
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