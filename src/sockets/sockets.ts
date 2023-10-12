import { Socket, io } from 'socket.io-client';

import useUserStore from '@/store/useUserStore';
import useRoomStore from '@/store/useRoomStore';
import useGeneralStore from '@/store/useGeneralStore';

import type { ClientToServerEvents, ServerToClientEvents } from '@/types/SocketType';


const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(import.meta.env.VITE_SERVER_ADDRESS, {
  autoConnect: false,
});

// Methods
const connectToSocket = () => {
  useUserStore().setUserConnectionStatus(true);

  socket.connect();
};

const disconnectFromSocket = () => {
  useUserStore().setUserConnectionStatus(false);
  
  socket.disconnect();
};

// On events
socket.on("connect", () => 
  useGeneralStore().setConnectionToSocket());

socket.on("disconnect", () => 
  useGeneralStore().setConnectionToSocket(false));

socket.on(`userList:update`, ( userList ) => 
  useRoomStore().setUserList(userList));

socket.on('vote:received', ( voteInfo ) => 
  useRoomStore().setVotes(voteInfo));

socket.on('vote:close', () => 
  useRoomStore().setIsVoteClosed());

socket.on('vote:open', () => 
  useRoomStore().setIsVoteClosed(false));

socket.on("connect_error", (err: Error) => 
  useGeneralStore().setError(err));

export { socket, connectToSocket, disconnectFromSocket };