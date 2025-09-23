import fs from 'fs';

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
        console.error('Error loading events:', error);
        return [];
    }
};

// Save events to events.json
export const saveEvents = events => {
    try {
        fs.writeFileSync('events.json', JSON.stringify(events, null, 2));
        console.log(`Saved ${events.length} events to events.json`);
    } catch (error) {
        console.error('Error saving events:', error);
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