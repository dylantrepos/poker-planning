import { getAllMessages, getAllVotes, getLeadId } from '@/utils/room';
import { state } from "@/utils/state";

import type { User } from "@/types/UserType";
import type { Message } from '@/types/MessageType';
import type { VoteInfo } from '@/types/VoteType';
import type { LeadId, VoteState } from '@/types/GenericType';


export const setConnectionToSocket = async (connected: boolean = true): Promise<void> => {
  state.connected = connected;
  await getAllMessages();
  await getAllVotes();
  await getLeadId();
}

export const updateUserList = async (userList: User[]): Promise<void> => {

  if (state.leadId === '') await getLeadId();

  state.userList = [...userList].map((user) => ({
    ...user,
    role: user.userId === state.leadId ? 'lead' : 'user'
  }));
}

export const messageReceived = ( message: Message ): void => {
  if (state.messages) {
    state.messages.push(message);
  }
};

export const updateVote = async (userVote: VoteInfo) => {
  state.votes[userVote.userId] = userVote.vote;

  if (userVote.userId === state.userId) state.vote = userVote.vote;
}

export const closeVote = async (voteState: VoteState) => {
  state.voteClose = voteState;
}

export const openVote = async (voteState: VoteState) => {
  state.voteClose = voteState;
  state.vote = '';
  state.votes = {};
  state.userList.forEach((user: User) => {
    delete state.votes[user.userId];
    user.vote = ''
  });
}

export const updateLead = async (leadId: LeadId) => {
  state.leadId = leadId;
}

export const handleError = (err: Error) => {
  console.error(`connect_error due to ${err.message}`);
}
