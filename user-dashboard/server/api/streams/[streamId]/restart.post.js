import { callVideoService } from '~/server/utils/utils.js';

export default defineEventHandler(async event => {
    try {
        const streamId = getRouterParam(event, 'streamId');
        const stream = await callVideoService(`/api/streams/${streamId}/restart`, { method: 'POST' });
        return { message: `Stream ${streamId} restarted successfully`, stream };
    } catch (error) {
        throw createError({ statusCode: 500, statusMessage: error.message });
    }
});