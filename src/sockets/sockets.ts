import { Socket, io } from 'socket.io-client';

import type { UserList } from '@/types/UserType';
import type { ClientToServerEvents, ServerToClientEvents } from '@/types/SocketType';
import type { Message } from '@/types/MessageType';
import type { VoteInfo } from '@/types/VoteType';
import type { LeadId } from '@/types/GenericType';

import useUserStore from '@/store/useUserStore';
import useRoomStore from '@/store/useRoomStore';
import useGeneralStore from '@/store/useGeneralStore';


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

socket.on(`userList:update`, ( userList: UserList ) => 
  useRoomStore().setUserList(userList));

socket.on(`message:received`, ( message: Message ) => 
  useRoomStore().addMessages(message));  

socket.on('vote:received', ( voteInfo: VoteInfo ) => 
  useRoomStore().setVotes(voteInfo));

socket.on('vote:close', () => 
  useRoomStore().setIsVoteClosed());

socket.on('vote:open', () => 
  useRoomStore().setIsVoteClosed(false));

socket.on('lead:update', ( leadId: LeadId ) => 
  useRoomStore().setLeadId(leadId));

socket.on("connect_error", (err: Error) => 
  useGeneralStore().setError(err));

export { socket, connectToSocket, disconnectFromSocket };