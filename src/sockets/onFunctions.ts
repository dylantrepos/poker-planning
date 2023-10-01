import { checkVoteOpen, getAllMessages, getAllVotes, getLeadId } from '@/utils/room';

import type { UserList } from "@/types/UserType";
import type { Message } from '@/types/MessageType';
import type { VoteInfo } from '@/types/VoteType';
import type { LeadId } from '@/types/GenericType';
import { addCookie, getCookie, setUserPosition, updateVoteResults } from '@/utils/utils';

import useUserStore from '@/store/useUserStore';
import useGeneralStore from '@/store/useGeneralStore';
import useRoomStore from '@/store/useRoomStore';


export const setConnectionToSocket = async (connected: boolean = true): Promise<void> => {
  const { setUserConnectionStatus } = useUserStore();
  const { setServerStatus } = useGeneralStore();
  setUserConnectionStatus(true);
  
  if (connected) {
    await getAllMessages();
    await getAllVotes();
    await getLeadId();
    await checkVoteOpen();
  }  else {
    setServerStatus(false);
  }
};

// Userlist
export const updateUserList = async (userList: UserList): Promise<void> => {
  const { leadId, setUserList, setUserListOrdered} = useRoomStore();

  if (leadId === '') await getLeadId();

  setUserList(userList);
  setUserListOrdered(setUserPosition());
};


// Message
export const messageReceived = ( message: Message ): void => {
  const { messages, addMessages } = useRoomStore();

  if (messages) {
    addMessages(message);
  }
};


// Vote
export const updateVote = async (userVote: VoteInfo) => {
  const { setVotes } = useRoomStore();
  setVotes(userVote);
};

export const closeVote = async () => {
  const { setVoteState } = useRoomStore();
  
  setVoteState(true);

  updateVoteResults();
};

export const openVote = async () => {
  const cookieData = getCookie();
  const { resetVotes } = useRoomStore();

  addCookie('poker-planning', JSON.stringify({...cookieData, vote: ''}));
  resetVotes();
};

export const updateLead = async (leadId: LeadId) => {
  const { setLeadId } = useRoomStore();
  setLeadId(leadId);
};

export const handleError = (err: Error) => {
  const { setServerStatus } = useGeneralStore();
  setServerStatus(false);
  
  console.error(`Error: connection impossible due to ${err.message}`);
};
