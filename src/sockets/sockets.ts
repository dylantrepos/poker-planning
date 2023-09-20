import { Socket, io } from 'socket.io-client';
import { closeVote, handleError, messageReceived, openVote, setConnectionToSocket, updateLead, updateUserList, updateVote } from '@/sockets/onFunctions';
import { state } from '@/utils/state';

import type { UserList } from '@/types/UserType';
import type { ClientToServerEvents, ServerToClientEvents } from '@/types/SocketType';
import type { Message } from '@/types/MessageType';
import type { VoteInfo } from '@/types/VoteType';
import type { LeadId } from '@/types/GenericType';


const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(import.meta.env.VITE_SERVER_ADDRESS, {
  autoConnect: false,
});

// Methods
const connectToSocket = () => {
  socket.connect();
  state.connected = true;
};

// On events
socket.on("connect", () => setConnectionToSocket());

socket.on("disconnect", () => setConnectionToSocket(false));

socket.on(`userList:update`, ( userList: UserList ) => updateUserList(userList));

socket.on(`message:received`, ( message: Message ) => messageReceived(message));  

socket.on('vote:received', ( voteInfo: VoteInfo ) => updateVote(voteInfo));

socket.on('vote:close', () => closeVote());

socket.on('vote:open', () => openVote());

socket.on('lead:update', ( leadId: LeadId ) => updateLead(leadId));

socket.on("connect_error", (err: Error) => handleError(err));

export { socket, connectToSocket };