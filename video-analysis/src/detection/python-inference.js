const PYTHON_SERVER_URL = process.env.PYTHON_SERVER_URL || 'http://localhost:3002';

// Call the Python inference server
export const callPythonInference = async (base64Image, confidence = 0.25) => {
    // Make POST request to Python server
    const response = await fetch(`${PYTHON_SERVER_URL}/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image: base64Image,
            confidence: confidence
        }),
    });

    // Check for errors
    if (!response.ok) {
        throw new Error(`Python server error: ${response.status} ${response.statusText}`);
    }

    // Parse the response
    const result = await response.json();
    return result;
};