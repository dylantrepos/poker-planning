import type { UserInfo, UserMessageEmit } from "@/types/UserType";
import { connectToSocket, socket } from "./sockets";
import { state } from "@/utils/state";

/**
 * 
 * ROOM EVENTS
 * 
 */

// JOIN ROOM
export const emitJoinRoom = async (userInfo: UserInfo): Promise<void> => {
  const {userId, roomId, username, vote} = userInfo;
  
  state.userId = userId;
  state.roomId = roomId;
  state.role = state.userId === state.leadId ? 'lead' : 'user';
  state.username = username;
  state.vote = vote;
  state.userList = [];
  state.messages = [];
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
  const { roomId, userId, username } = state; 

  const messageData: UserMessageEmit = {
    roomId, 
    userId, 
    username,
    message,
}

  socket.emit('message:create', messageData);
}


/**
 * 
 * VOTE EVENTS
 * 
 */

// EMIT VOTE
export const emitVote = (vote: string): void => {
  const data = {
    userId: state.userId,
    roomId: state.roomId,
    vote: vote
  }
  socket.emit('vote:create', data);
}

// EMIT CLOSE VOTE
export const emitCloseVote = (): void => {
  const {roomId, userId} = state;
  socket.emit('vote:close', {roomId, userId});
}

// EMIT CLOSE VOTE
export const emitOpenVote = (): void => {
  const {roomId, userId} = state;
  socket.emit('vote:open', {roomId, userId});
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
    roomId: state.roomId,
    leadId
  });
}