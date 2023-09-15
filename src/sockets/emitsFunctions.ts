import type { User } from "@/types/UserType";
import { connectToSocket, socket } from "./sockets";
import { state } from "@/utils/state";
import type { MessageEmit } from "@/types/MessageType";
import type { Vote } from "@/types/GenericType";

/**
 * 
 * ROOM EVENTS
 * 
 */

// JOIN ROOM
export const emitJoinRoom = async (userInfo: User): Promise<void> => {
  const { userId, roomId, userName } = userInfo;
  
  state.messages = [];
  state.roomId = roomId;
  state.userId = userId;
  state.userList = {};
  state.userName = userName;
  state.votes = {};

  if (!state.connected) connectToSocket();

  socket.emit('room:join', userInfo);
}


/**
 * 
 * MESSAGE EVENTS
 * 
 */

// SEND MESSAGE
export const emitMessage = (message: string): void => {  
  const { roomId, userId, userName } = state; 

  const messageData: MessageEmit = {
    message,
    roomId, 
    userId, 
    userName,
}

  socket.emit('message:create', messageData);
}


/**
 * 
 * VOTE EVENTS
 * 
 */

// EMIT VOTE
export const emitVote = (voteValue: Vote): void => {
  const vote = {
    roomId: state.roomId,
    userId: state.userId,
    vote: voteValue
  }
  
  socket.emit('vote:create', vote);
}

// CLOSE VOTE
export const emitCloseVote = (): void => {
  socket.emit('vote:close', state.roomId);
}

// OPEN VOTE
export const emitOpenVote = (): void => {
  socket.emit('vote:open', state.roomId);
}


/**
 * 
 * LEAD EVENTS
 * 
 */

// EMIT NEW LEAD
export const emitLead = (leadId: string): void => {
  state.leadId = leadId;

  socket.emit('lead:update', {
    leadId,
    roomId: state.roomId,
  });
}