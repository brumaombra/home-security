import { initSocket } from '~/composables/useSocket.js';

export default defineNuxtPlugin(() => {
    initSocket(); // Initialize websocket connection
});