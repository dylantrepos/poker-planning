import type { LeadId, UserId, Vote, VoteState } from '@/types/GenericType';
import type { Message } from '@/types/MessageType';
import type { UserList } from '@/types/UserType';
import { state } from '@/utils/state';

/**
 * Check if server is live.
 * - Udapte state.serverLive value.
 */
export const checkServerState = async () => {
  try {
    const tryConnectionRequest = fetch(import.meta.env.VITE_SERVER_ADDRESS);
    const connectionStatus = (await tryConnectionRequest).status
    state.serverLive = connectionStatus >= 200 && connectionStatus < 300 ? true : false;
  } catch (e) {
    state.serverLive = false;
  }
}

/**
 * Retreive list of current user in room `state.roomId`.
 * - Update state.userList value.
 * 
 * @param roomId 
 * @returns List of users
 */
export const getUserList = async (): Promise<void> => {
  const listUserRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/user-list/${state.roomId}`);
  const listUserResponse: Awaited<UserList> = (await listUserRequest.json()).list;

  state.userList = listUserResponse;
}

/**
 * Retreive all messages from room `state.roomId`.
 * - Update state.messages value.
 * 
 * @param roomId 
 * @returns List of messages
 */
export const getAllMessages = async (): Promise<void> => {
  let messages: Message[] = [];

  try {
    const getAllMessagesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/messages/${state.roomId}`);
    messages = await getAllMessagesRequest.json();
  } catch (e) {
    console.warn(`Warning : Fail to get messages from server.`);
    await checkServerState();
  }

  state.messages = messages;
}

/**
 * Retreive all votes from room `state.roomId`.
 * - Update state.votes value.
 */
export const getAllVotes = async (): Promise<void> => {
  let votes: Record<UserId, Vote> = {};

  try {
    const getAllvotesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/votes/${state.roomId}`);
    votes = await getAllvotesRequest.json();
  } catch (e) {
    console.warn(`Warning : Fail to get votes from server.`);
    await checkServerState();
  }

  state.votes = votes;
}

/**
 * Retreive the ID of the lead user.
 * - Update state.leadId value.
 * 
 */
export const getLeadId = async (): Promise<void> => {
  let leadId: LeadId = '';

  try {
    const getLeadIdRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/lead/${state.roomId}`);
    leadId = (await getLeadIdRequest.json()).leadId;
  } catch (e) {
    console.warn(`Warning : Fail to get lead from server.`);
    await checkServerState();
  }

  state.leadId = leadId;
}

/**
 * Check if room `state.roomId` exists.
 * - Update state.roomExists value.
 */
export const checkRoomExists = async (): Promise<void> => {
  let roomExists: boolean = false;

  try {
    const roomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check-room/${state.roomId}`);
    roomExists = (await roomExistsRequest.json()).exist;
  } catch (e) {
    console.warn(`Warning : Fail to check if room exists from server.`);
    await checkServerState();
  }
  
  state.roomExists = roomExists;
}

/**
 * Check if vote is open for `state.roomId`.
 * - Update state.voteClose value.
 */
export const checkVoteOpen = async (): Promise<void> => {
  let voteClose: VoteState = false; 
  try {
    const stateVoteRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/vote-state/${state.roomId}`);
    voteClose = (await stateVoteRequest.json()).close;
  } catch (e) {
    console.warn(`Warning : Fail to get vote state from server.`);
    await checkServerState();
  }

  state.voteClose = voteClose;
}
