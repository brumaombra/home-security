import { handleNuxtErrorMessages } from '~/server/utils/error.js';
import { callVideoService } from '~/server/utils/utils.js';

export default defineEventHandler(async () => {
    try {
        const results = await callVideoService('/api/events');
        return results || []; // Return the results
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error loading events' });
    }
});