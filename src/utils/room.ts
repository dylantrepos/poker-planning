import type { UserMessage, UserList } from "@/types/UserType";
import { state } from "@/sockets/sockets";

/**
 * Retreive list of current user in room `roomId`.
 * 
 * @param roomId 
 * @returns List of users
 */
export const getUserList = async (): Promise<void> => {
  console.log('listUserRequestst test : ', state.roomId);
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

    state.rooms[state.roomId].messages = (await getAllMessagesRequest.json()).messages;
}

export const checkRoomExists = async (): Promise<boolean> => {
    const roomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check/${state.roomId}`);
    const roomExistsResponse = await roomExistsRequest.json();
    
    return roomExistsResponse.exist;
}
