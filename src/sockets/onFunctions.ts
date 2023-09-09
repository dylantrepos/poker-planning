import type { UserInfo, UserMessage } from "@/types/UserType";
import type { UserListSocket } from "../types/SocketType";
import { state } from "./sockets";

export const setConnectionToSocket = (connected: boolean = true): void => {
  state.connected = connected;
}

export const updateUserList = (data: UserListSocket): void => {
  const usersList = [...new Map((data.userList)
      .map((v: UserInfo) => [v.userId, v]))
      .values()];

  const newUserList: UserInfo[] = [];

  data.userList.map(user => {
      const exists = newUserList.findIndex(u => u.userId === user.userId);
      if (exists === -1) {
        newUserList.push(user);
      } else {
        if (user.role === 'lead') {
          newUserList.splice(exists, 1)
        }
      }
  })

  const userLead = data.userList.find(user => user.role === 'lead');

  state.rooms[data.roomId]?.userList.find(user => user.userId === state.userId)?.role;
  
  state.rooms[data.roomId].userList = usersList;
  state.role = userLead?.userId === state.userId ? 'lead' : 'user';
}

export const getMessage = ( data: UserMessage ): void => {
  state.rooms[data.roomId].messages.push(data);
};

export const handleError = (err: Error) => {
  console.error(`connect_error due to ${err.message}`);
}
