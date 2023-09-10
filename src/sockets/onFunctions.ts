import { state } from "./sockets";
import { getAllMessages, getAllVotes } from "@/utils/room";
import type { UserList, UserMessage, UserVote } from "@/types/UserType";

export const setConnectionToSocket = (connected: boolean = true): void => {
  state.connected = connected;
}

export const updateUserList = async (userList: UserList): Promise<void> => {
  state.rooms[state.roomId].userList = userList;
  if (state.rooms[state.roomId].messages.length === 0) {
    await getAllMessages();
    await getAllVotes();
  }
}

export const messageReceived = ( data: UserMessage ): void => {
  if (state.rooms[state.roomId].messages) {
    state.rooms[state.roomId].messages.push(data);
  }
};

export const updateVote = async (data: UserVote[]) => {
  state.rooms[state.roomId].votes = data;
}

export const handleError = (err: Error) => {
  console.error(`connect_error due to ${err.message}`);
}
