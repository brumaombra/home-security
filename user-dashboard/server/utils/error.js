import { createError } from 'h3';

// Global error handler
export const handleError = ({ error, message = '', throwError = false }) => {
    let customError = error;
    if (message) {
        customError = new Error(error.message); // Create custom error
        customError.name = message; // Set custom title to a default value
        if (error.stack) customError.stack = error.stack; // Preserve original stack trace
        if (error.code) customError.code = error.code; // Preserve original error code
        if (error.statusCode) customError.statusCode = error.statusCode; // Preserve original status code
    }

    // Log and rethrow error if needed
    console.error(message || 'An error occurred:', customError);
    if (throwError) throw customError;
};

// Handle the Nuxt error messages
export const handleNuxtErrorMessages = ({ error, message = '' }) => {
    // Handle the error with Sentry
    handleError({ error, errorMessage: message, throwError: false });

    // If the error is a Nuxt error, re-throw it as it is
    if (error && error.statusCode) {
        throw error;
    }

    // Otherwise, throw a generic error
    throw createError({
        statusCode: 500,
        statusMessage: 'internal_server_error',
        message: message || 'Internal server error'
    });
};