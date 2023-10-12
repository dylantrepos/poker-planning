import type { RoomId, UserId, Vote, VoteState } from '@/types/GenericType';
import type { Message } from '@/types/MessageType';
import type { UserList } from '@/types/UserType';
import useGeneralStore from '@/store/useGeneralStore';
import useRoomStore from '@/store/useRoomStore';

/**
 * *
 * Contains all the requests made to the server.
 * *
 */

/**
 * Check if server is live.
 */
export const checkServerState = async (): Promise<void> => {
  const { setServerStatus } = useGeneralStore();

  const tryConnectionRequest = fetch(import.meta.env.VITE_SERVER_ADDRESS);
  const connectionStatus = (await tryConnectionRequest).status;
  const isServerLive = connectionStatus >= 200 && connectionStatus < 300 ? true : false;

  setServerStatus(isServerLive);
};

/**
 * Retreive list of current user in room `roomId`.
 */
export const getUserListFromServer = async (): Promise<void> => {
  const { roomId, setUserList} = useRoomStore();

  const listUserRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/user-list/${roomId}`);
  const listUserResponse: Awaited<UserList> = (await listUserRequest.json()).list;

  await setUserList(listUserResponse);
};

/**
 * Retreive all messages from room `roomId`.
 */
export const getAllMessagesFromServer = async (): Promise<void> => {
  const { roomId, setMessages } = useRoomStore();
  let messages: Message[] = [];

  try {
    const getAllMessagesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/messages/${roomId}`);
    messages = await getAllMessagesRequest.json();
  } catch (e) {
    console.warn(`Warning : Fail to get messages from server.`);
    await checkServerState();
  }
  
  setMessages(messages);
};

/**
 * Retreive all votes from room `roomId`.
 */
export const getAllVotesFromServer = async (): Promise<void> => {
  const { roomId, setVotes } = useRoomStore();
  let votes: Record<UserId, Vote> = {};

  try {
    const getAllvotesRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/votes/${roomId}`);

    votes = await getAllvotesRequest.json();
  } catch (e) {
    console.warn(`Warning : Fail to get votes from server.`);
    await checkServerState();
  }

  setVotes(votes);
};

/**
 * Check if room `roomId` exists.
 */
export const checkRoomExists = async (id: RoomId): Promise<boolean> => {
  const { setRoomExists } = useRoomStore();
  let roomExists = false;

  try {
    const roomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check-room/${id}`);
    roomExists = (await roomExistsRequest.json()).exist;
    if (roomExists) setRoomExists();
  } catch (e) {
    console.warn(`Warning : Fail to check if room exists from server.`);
    await checkServerState();
  }
  

  return roomExists;
};

/**
 * Check if vote is open for `roomId`.
 */
export const checkVoteIsOpen = async (): Promise<void> => {
  const { roomId, setIsVoteClosed, updateVoteResults } = useRoomStore();

  try {
    const stateVoteRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/vote-state/${roomId}`);
    const voteClose: VoteState = (await stateVoteRequest.json()).close;

    if (voteClose) {
      updateVoteResults();
      setIsVoteClosed();
    }

  } catch (e) {
    console.warn(`Warning : Fail to check if vote is open from server.`);

    await checkServerState();
  }

};
