import type { UserInfo, UserMessageEmit } from "@/types/UserType";
import { socket } from "./sockets";

// Emits events
export const emitMessage = (userInfo: UserMessageEmit): void => {  
  socket.emit('chat-message', userInfo);
}

export const emitJoinRoom = (userInfo: UserInfo): void => {
   socket.emit('join-room', userInfo);
}