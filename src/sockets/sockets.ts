import type { UserInfo, UserMessageEmit } from '@/types/UserType';
import { io } from 'socket.io-client';
import { reactive } from 'vue';

type State = {
  connected: boolean,
  rooms: UserInfo[],
}

export const state = reactive<State>({
    connected: false,
    rooms: [],
  });

export const socket = io(import.meta.env.VITE_SERVER_ADDRESS, {
    autoConnect: false
  });


/**
 * 
 * ON SOCKET
 * 
 */
socket.on("connect", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});

socket.on(`update-userList`, ( data: UserInfo[] ) => {
  state.rooms = [...new Map(data.map((v: UserInfo) => [v.userId, v])).values()]
})

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});


/**
 * 
 * EMIT SOCKET
 * 
 */
export const emitMessage = (userInfo: UserMessageEmit): void => {  
  socket.emit('chat-message', userInfo);
}

export const emitJoinRoom = (userInfo: UserInfo): void => {
   socket.emit('join-room', userInfo);
}