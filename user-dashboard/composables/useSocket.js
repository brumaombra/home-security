import { io } from 'socket.io-client';
import { getVideoServiceFullUrl, showMessageToast } from '~/composables/useUtils.js';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

let socket = null; // Socket.IO client instance

// Initialize socket connection
export const initSocket = () => {
    if (socket) return socket;
    const globalStore = useGlobalStore();
    const backendUrl = getVideoServiceFullUrl(); // Get backend URL from runtime config
    socket = io(backendUrl); // Connect to the backend

    // On socket connect
    socket.on('connect', () => {
        console.log('Connected to backend via WebSocket');
        globalStore.value.websocket.status = 'connected';
    });

    // On socket disconnect
    socket.on('disconnect', () => {
        console.log('Disconnected from backend');
        globalStore.value.websocket.status = 'disconnected';
    });

    // On connection error
    socket.on('connect_error', error => {
        console.error('Socket connection error:', error);
        globalStore.value.websocket.status = 'disconnected';
    });

    // On connecting
    socket.on('connecting', () => {
        globalStore.value.websocket.status = 'connecting';
    });

    // On event detected from backend
    socket.on('event-detected', data => {
        // Show toast notification using the dedicated function
        showMessageToast({
            message: `Event detected from Stream ${data.streamId}`,
            type: 'info'
        });
    });

    // Return the socket instance
    return socket;
};

// Disconnect socket
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

// Get socket instance
export const getSocket = () => {
    return socket;
};