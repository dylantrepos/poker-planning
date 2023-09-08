import type { UserInfo, UserMessage } from "@/types/UserType";
import type { UserListSocket } from "../types/SocketType";
import { state } from "./sockets";

export const setConnectionToSocket = (connected: boolean = true): void => {
  state.connected = connected;
}

export const updateUserList = (data: UserListSocket): void => {
  console.log('coucou : ', data);
  const usersList = [...new Map((data.userList)
    .map((v: UserInfo) => [v.userId, v]))
    .values()];
    
  state.rooms[data.roomId].userList = usersList;
}

export const getMessage = ( data: UserMessage ): void => {
  state.rooms[data.roomId].messages.push(data);
};

export const handleError = (err: Error) => {
  console.error(`connect_error due to ${err.message}`);
}
