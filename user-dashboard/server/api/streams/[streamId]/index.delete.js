import { handleNuxtErrorMessages } from '~/server/utils/error.js';
import { callVideoService } from '~/server/utils/utils.js';

export default defineEventHandler(async event => {
    try {
        const { streamId } = getRouterParams(event);
        const results = await callVideoService(`/api/streams/${streamId}`, { method: 'DELETE' });
        return results; // Return the results
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error deleting stream' });
    }
});