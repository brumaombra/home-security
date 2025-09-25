import { handleNuxtErrorMessages } from '~/server/utils/error.js';
import { callVideoService } from '~/server/utils/utils.js';

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event);
        const results = await callVideoService('/api/streams', {
            method: 'POST',
            body: body
        });
        return results; // Return the results
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error creating stream' });
    }
});