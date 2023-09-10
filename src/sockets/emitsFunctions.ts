import type { UserInfo, UserMessageEmit } from "@/types/UserType";
import { socket, state } from "./sockets";
import { getAllMessages, getUserList } from "@/utils/room";

// Emits events
export const emitMessage = (message: string): void => {  
  const {roomId, userId, username, role, vote} = state; 

  const messageData: UserMessageEmit = {
    roomId, 
    userId, 
    username,
    role,
    vote,
    message,
}

  socket.emit('new-message', messageData);
}

export const emitJoinRoom = async (userInfo: UserInfo): Promise<void> => {
  const {userId, roomId, username, vote, role} = userInfo;
  
  state.userId = userId;
  state.roomId = roomId;
  state.role = role;
  state.username = username;
  state.vote = vote;
  state.rooms[roomId] = {
    userList: [],
    messages: [],
  }
  
  socket.emit('join-room', userInfo);

  await getUserList();

  await getAllMessages();

  emitVote(vote);

}

export const emitVote = (vote: string): void => {
  socket.emit('update-vote', vote);
}