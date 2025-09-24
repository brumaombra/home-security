import { handleNuxtErrorMessages } from '~/server/utils/error.js';
import { loadEvents } from '~/server/storage/storage.js';

export default defineEventHandler(async () => {
    try {
        const events = await loadEvents(); // Read the events from the JSON file
        return events || []; // Return the events
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error loading events' });
    }
});