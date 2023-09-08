import type { UserInfo, UserMessage, UserMessageEmit } from '@/types/UserType';
import { io } from 'socket.io-client';
import { reactive } from 'vue';
import type { State, UserListSocket } from './SocketType';
import { getMessage, handleError, setConnectionToSocket, updateUserList } from './onFunctions';

export const state = reactive<State>({
  connected: false,
  rooms: {}
});

export const socket = io(import.meta.env.VITE_SERVER_ADDRESS, {
  autoConnect: false
});

// Methods
export const connectToSocket = () => {
  socket.connect();
}



// On events
socket.on("connect", () => setConnectionToSocket());

socket.on("disconnect", () => setConnectionToSocket(false));

socket.on(`update-userList`, ( data: UserListSocket ) => updateUserList(data));

socket.on(`message`, ( data: UserMessage ) => getMessage(data));  

socket.on("connect_error", (err: Error) => handleError(err));
