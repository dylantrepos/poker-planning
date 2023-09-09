import { io } from 'socket.io-client';
import { reactive } from 'vue';

import { getMessage, handleError, setConnectionToSocket, updateUserList } from './onFunctions';

import type { UserMessage } from '@/types/UserType';
import type { State, UserListSocket } from '../types/SocketType';

const state = reactive<State>({
  connected: false,
  userId: '',
  roomId: '',
  username: '',
  role: 'user',
  rooms: {}
});

const socket = io(import.meta.env.VITE_SERVER_ADDRESS, {
  autoConnect: false
});

// Methods
const connectToSocket = () => {
  socket.connect();
}

// On events
socket.on("connect", () => setConnectionToSocket());

socket.on("disconnect", () => setConnectionToSocket(false));

socket.on(`update-userList`, ( data: UserListSocket ) => updateUserList(data));

socket.on(`message`, ( data: UserMessage ) => getMessage(data));  

socket.on("connect_error", (err: Error) => handleError(err));

export { state, socket, connectToSocket };