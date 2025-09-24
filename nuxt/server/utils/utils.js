import { handleError } from '~/server/utils/error.js';

// Call the main video streaming service
export const callVideoService = async (url, options = {}) => {
    try {
        const fullUrl = `http://localhost:3001${url}`;
        const response = await $fetch(fullUrl, options);
        return response;
    } catch (error) {
        handleError({ error, message: 'Error calling video streaming service', throwError: true });
    }
};