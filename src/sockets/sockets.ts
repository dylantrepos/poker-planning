import { io } from 'socket.io-client';
import { handleError, messageReceived, setConnectionToSocket, updateLead, updateUserList, updateVote } from '@/sockets/onFunctions';
import { state } from '@/utils/state';

import type { UserList, UserMessage, UserVote } from '@/types/UserType';


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

socket.on('vote:received', ( data: UserVote ) => updateVote(data));

socket.on('lead:update', ( data: string ) => updateLead(data));

socket.on("connect_error", (err: Error) => handleError(err));

export { socket, connectToSocket };