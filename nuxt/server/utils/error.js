import { createError } from 'h3';

// Global error handler
export const handleError = ({ error, errorMessage = '', throwError = false }) => {
    let customError = error;
    if (errorMessage) {
        customError = new Error(error.message); // Create custom error
        customError.name = errorMessage; // Set custom title to a default value
        if (error.stack) customError.stack = error.stack; // Preserve original stack trace
        if (error.code) customError.code = error.code; // Preserve original error code
        if (error.statusCode) customError.statusCode = error.statusCode; // Preserve original status code
    }

    // Log and rethrow error if needed
    console.error(errorMessage || 'An error occurred:', customError);
    if (throwError) throw customError;
};

// Handle the Nuxt error messages
export const handleNuxtErrorMessages = ({ error, errorTranslated = '', errorMessage = '' }) => {
    // Handle the error with Sentry
    handleError({ error, errorMessage: errorMessage, throwError: false });

    // If the error is a Nuxt error, re-throw it as it is
    if (error && error.statusCode) {
        throw error;
    }

    // Otherwise, throw a generic error
    throw createError({
        statusCode: 500,
        statusMessage: 'internal_server_error',
        message: errorTranslated || 'Internal server error'
    });
};