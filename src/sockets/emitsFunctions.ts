import type { UserInfo, UserMessageEmit } from "@/types/UserType";
import { connectToSocket, socket, state } from "./sockets";

// Emits events

// CREATE ROOM
export const emitCreateRoom = async (userInfo: UserInfo): Promise<void> => {
  const {userId, roomId, username, vote} = userInfo;
  
  state.userId = userId;
  state.roomId = roomId;
  state.username = username;
  state.rooms[roomId] = {
    userList: [{
      userId,
      username,
      role: 'lead',
      vote: '',
    }],
    messages: [],
    votes: [],
  }
  
  socket.emit('room:create', userInfo);
}

// SEND MESSAGE
export const emitMessage = (message: string): void => {  
  const { roomId, userId, username } = state; 

  const messageData: any = {
    roomId, 
    userId, 
    username,
    message,
}

  socket.emit('message:create', messageData);
}

// JOIN ROOM
export const emitJoinRoom = async (userInfo: UserInfo): Promise<void> => {
  const {userId, roomId, username} = userInfo;
  
  state.userId = userId;
  state.roomId = roomId;
  state.username = username;
  state.rooms[roomId] = {
    userList: [],
    messages: [],
    votes: [],
  }

  connectToSocket();
  socket.emit('room:join', userInfo);
  
  // emitVote(vote);
}

// EMIT VOTE
export const emitVote = (vote: string): void => {
  const data = {
    userId: state.userId,
    roomId: state.roomId,
    vote: vote
  }
  socket.emit('vote:create', data);
}