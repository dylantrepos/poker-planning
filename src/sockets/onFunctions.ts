import { checkVoteOpen, getAllMessages, getAllVotes, getLeadId } from '@/utils/room';
import { state } from "@/utils/state";

import type { UserList } from "@/types/UserType";
import type { Message } from '@/types/MessageType';
import type { VoteInfo } from '@/types/VoteType';
import type { LeadId } from '@/types/GenericType';
import { addCookie, getCookie } from '@/utils/utils';


export const setConnectionToSocket = async (connected: boolean = true): Promise<void> => {
  state.connected = connected;
  await getAllMessages();
  await getAllVotes();
  await getLeadId();
  await checkVoteOpen();
}

export const updateUserList = async (userList: UserList): Promise<void> => {
  if (state.leadId === '') await getLeadId();

  state.userList = userList;
}



export const messageReceived = ( message: Message ): void => {
  if (state.messages) {
    state.messages.push(message);
  }
};

export const updateVote = async (userVote: VoteInfo) => {
  state.votes = userVote;
}

export const closeVote = async () => {
  state.voteClose = true;
}

export const openVote = async () => {
  const cookieData = getCookie();

  addCookie('poker-planning', JSON.stringify({...cookieData, vote: ''}));

  state.voteClose = false;
  state.vote = '';
  state.votes = {};

  for (const [key] of Object.entries(state.userList)) {
    state.userList[key].vote = '';
  }
  
}

export const updateLead = async (leadId: LeadId) => {
  state.leadId = leadId;
}

export const handleError = (err: Error) => {
  console.error(`Error: connection impossible due to ${err.message}`);
}
