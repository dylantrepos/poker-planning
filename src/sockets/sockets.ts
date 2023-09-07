import { io } from 'socket.io-client';
import { reactive } from 'vue';

export const state = reactive({
    connected: false,
    rooms: [],
  });

export const socket = io(import.meta.env.VITE_SERVER_ADDRESS, {
    autoConnect: false
  });

socket.on("connect", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});
