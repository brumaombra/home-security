import { handleNuxtErrorMessages } from '~/server/utils/error.js';
import { callVideoService } from '~/server/utils/utils.js';

export default defineEventHandler(async event => {
    try {
        const query = getQuery(event);
        const results = await callVideoService('/api/events', { query });
        return results; // Return the results
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error loading events' });
    }
});