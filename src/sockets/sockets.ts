import { io } from 'socket.io-client';
import { reactive } from 'vue';

import { handleError, messageReceived, setConnectionToSocket, updateUserList, updateVote } from './onFunctions';

import type { UserList, UserMessage, UserVote } from '@/types/UserType';
import type { State } from '../types/SocketType';

const state = reactive<State>({
  connected: false,
  userId: '',
  roomId: '',
  username: '',
  roomExists: false,
  role: 'user',
  rooms: {}
});

const socket = io(import.meta.env.VITE_SERVER_ADDRESS, {
  autoConnect: false,
});

// Methods
const connectToSocket = () => {
  socket.connect();
  state.connected = true;
}

// On events
socket.on("connect", () => setConnectionToSocket());

socket.on("disconnect", () => setConnectionToSocket(false));

socket.on(`userList:update`, ( data: UserList ) => updateUserList(data));

socket.on(`message:received`, ( data: UserMessage ) => messageReceived(data));  

socket.on('vote:received', ( data: UserVote[] ) => updateVote(data));

socket.on("connect_error", (err: Error) => handleError(err));

export { state, socket, connectToSocket };