import fs from 'fs';
import { printLog } from '../utils/utils.js';

// Load events from events.json
export const loadEvents = () => {
    try {
        // Check if file exists
        if (fs.existsSync('data/events.json')) {
            const data = fs.readFileSync('data/events.json', 'utf8');
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
        // Ensure the data directory exists
        fs.mkdirSync('data', { recursive: true });
        fs.writeFileSync('data/events.json', JSON.stringify(events, null, 2));
        printLog(`Saved ${events.length} events to data/events.json`);
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
