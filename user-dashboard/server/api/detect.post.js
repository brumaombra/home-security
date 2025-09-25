import { handleNuxtErrorMessages } from '~/server/utils/error.js';
import { callVideoService } from '~/server/utils/utils.js';

export default defineEventHandler(async event => {
    try {
        // Read multipart form data
        const formDataArray = await readMultipartFormData(event);
        const formData = new FormData();
        for (const field of formDataArray) {
            if (field.filename) {
                formData.append(field.name, new Blob([field.data], { type: field.type }), field.filename);
            } else {
                formData.append(field.name, field.data.toString());
            }
        }

        // Call the video service API
        const results = await callVideoService('/api/detect', {
            method: 'POST',
            body: formData
        });

        // Return the results
        return results;
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error detecting objects' });
    }
});