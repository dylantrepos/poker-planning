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





// socket.on((pageId as string), ( data: SocketDataReceived ) => {
//     messageElts.value.push({ username: data.username, message: data.message});
// })

type SocketType = 
      'create-game' 
    | 'join-game' 
    | 'chat-message';

type SocketData = {
    userId: string; 
    roomId: string | string[];
    username: string;
    message?: string;
};


/**
 * Emits Sockets
 */
export const emitSocket = (
    type: SocketType, 
    data: SocketData
) => {
    socket.emit(type, data);
}

