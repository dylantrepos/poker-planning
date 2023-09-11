import type { LeadId, Message, RoomExists, User, UserId, UserList, Vote } from "@/types/UserType";
import { state } from '@/utils/state';

/**
 * Retreive list of current user in room `state.roomId`.
 * - Update state.userList value.
 * 
 * @param roomId 
 * @returns List of users
 */
export const getUserList = async (): Promise<void> => {
  const listUserRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/user-list/${state.roomId}`);
  const listUserResponse: Awaited<User[]> = (await listUserRequest.json()).list;

  state.userList = listUserResponse.map((user) => ({
    ...user,
    role: user.userId === state.leadId ? 'lead' : 'user'
  }))
}

/**
 * Retreive all messages from room `state.roomId`.
 * - Update state.messages value.
 * 
 * @param roomId 
 * @returns List of messages
 */
export const getAllMessages = async (): Promise<void> => {
  const getAllMessagesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/messages/${state.roomId}`);
  const getAllMessagesResponse: Awaited<Message[]> = await getAllMessagesRequest.json();

  state.messages = getAllMessagesResponse;
}

/**
 * Retreive all votes from room `state.roomId`.
 * - Update state.votes value.
 */
export const getAllVotes = async (): Promise<void> => {
  const getAllvotesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/votes/${state.roomId}`);
  const getAllVoteResponse: Awaited<Record<UserId, Vote>> = await getAllvotesRequest.json();

  if (getAllVoteResponse[state.userId]) state.vote = getAllVoteResponse[state.userId];

  state.votes = getAllVoteResponse;
}

/**
 * Retreive the ID of the lead user.
 * - Update state.leadId value.
 * 
 */
export const getLeadId = async (): Promise<void> => {
  const getLeadIdRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/lead/${state.roomId}`);
  const getLeadResponse: Awaited<LeadId> = (await getLeadIdRequest.json()).leadId;

  if (getLeadResponse === state.userId) state.role = 'lead'
  state.leadId = getLeadResponse;
}

/**
 * Check if room `state.roomId` exists.
 * - Update state.roomExists value.
 */
export const checkRoomExists = async (): Promise<void> => {
  const roomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check-room/${state.roomId}`);
  const roomExistsResponse : Awaited<RoomExists> = await roomExistsRequest.json();
  
  state.roomExists = roomExistsResponse.exist;
}
