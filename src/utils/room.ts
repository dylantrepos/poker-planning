import type { UserList } from "@/types/UserType";
import { state } from "@/sockets/sockets";
import { getCookieString } from "./utils";
import { emitJoinRoom } from "@/sockets/emitsFunctions";

/**
 * Retreive list of current user in room `roomId`.
 * 
 * @param roomId 
 * @returns List of users
 */
export const getUserList = async (): Promise<void> => {
  const listUserRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/user-list/${state.roomId}`);
  const listUserResponse: Awaited<Promise<UserList>> = (await listUserRequest.json()).list;

  state.rooms[state.roomId].userList = listUserResponse
}

/**
 * Retreive all messages from room `roomId`
 * 
 * @param roomId 
 * @returns List of messages
 */
export const getAllMessages = async (): Promise<void> => {
  const getAllMessagesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/messages/${state.roomId}`);
  const getAllMessagesResponse = await getAllMessagesRequest.json();

  state.rooms[state.roomId].messages = getAllMessagesResponse;
}

export const getAllVotes = async (): Promise<void> => {
  const getAllvotesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/votes/${state.roomId}`);
  const getAllVoteResponse = await getAllvotesRequest.json();

  state.rooms[state.roomId].votes = getAllVoteResponse;
}

export const checkRoomExists = async (): Promise<void> => {
  const roomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check-room/${state.roomId}`);
  const roomExistsResponse = await roomExistsRequest.json();
  
  state.roomExists = roomExistsResponse.exist;
}

export const checkUserExists = async (): Promise<void> => {
  const userIdFromCookie = getCookieString('poker-planning2') || '';
  
  const userExistsRequest = await fetch(
    `${import.meta.env.VITE_SERVER_ADDRESS}/check-user/${state.roomId}/${userIdFromCookie}`);
    const userExistsResponse = await userExistsRequest.json();
    
    if (userExistsResponse.userId.length > 0) {
      await emitJoinRoom(userExistsResponse);
    }
}
