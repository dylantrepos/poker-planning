import type { UserMessage, UserList } from "@/types/UserType";
import { getCookie } from "./utils";

/**
 * Retreive list of current user in room `roomId`.
 * 
 * @param roomId 
 * @returns List of users
 */
export const getUserList = async (roomId: string): Promise<UserList> => {
    const listUserRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/user-list/${roomId}`);
    const listUserResponse: Awaited<Promise<UserList>> = (await listUserRequest.json()).list;

     const cookieData = getCookie();
        
    if (roomId === cookieData.roomId) {
        const listUser: UserList = [...new Map([
            { userId: cookieData.userId, username: cookieData.username }, 
            ...listUserResponse
        ].map((v: any) => [v.userId, v])).values()];

        return listUser;
    }

    return [];
}

/**
 * Retreive all messages from room `roomId`
 * 
 * @param roomId 
 * @returns List of messages
 */
export const getAllMessages = async (roomId: string): Promise<UserMessage[]> => {
    const getAllMessagesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/messages/${roomId}`);
    const getAllMessagesResponse: Awaited<UserMessage[]> = (await getAllMessagesRequest.json()).messages.map((e: any) => JSON.parse(e)); 

    const convOrdered = [...getAllMessagesResponse].sort((a, b) => a.order > b.order ? 1 : -1);

    return convOrdered;
}

export const checkRoomExists = async (roomId: string): Promise<boolean> => {
    const roomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check/${roomId}`);
    const roomExistsResponse = await roomExistsRequest.json();
    
    return roomExistsResponse.exist;
}