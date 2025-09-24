import fs from 'fs';
import path from 'path';

// Load events from events.json
export const loadEvents = async () => {
    try {
        // Define the file path
        const filePath = path.join(process.cwd(), 'public', 'events.json');

        // Check if file exists
        if (fs.existsSync(filePath)) {
            const data = await fs.promises.readFile(filePath, 'utf8');
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
export const saveEvents = async events => {
    try {
        const filePath = path.join(process.cwd(), 'public', 'events.json');
        await fs.promises.writeFile(filePath, JSON.stringify(events, null, 2));
        console.log(`Saved ${events.length} events to events.json`);
    } catch (error) {
        console.error('Error saving events:', error);
        throw error;
    }
};

// Add a new event
export const addEvent = async event => {
    const events = await loadEvents();
    events.unshift(event); // Add to beginning for chronological order (newest first)
    if (events.length > 1000) events.splice(1000); // Keep only the last 1000 events to prevent file from growing too large
    await saveEvents(events);
    return event;
};