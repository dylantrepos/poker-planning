import { getAllMessages, getAllVotes, getLeadId } from '@/utils/room';
import { state } from "@/utils/state";

import type { UserList, UserMessage, UserVote } from "@/types/UserType";


export const setConnectionToSocket = async (connected: boolean = true): Promise<void> => {
  state.connected = connected;
  await getAllMessages();
  await getAllVotes();
  await getLeadId();
}

export const updateUserList = async (userList: UserList): Promise<void> => {

  if (state.leadId === '') await getLeadId();

  state.userList = [...userList].map((user) => ({
    ...user,
    role: user.userId === state.leadId ? 'lead' : 'user'
  }));
}

export const messageReceived = ( data: UserMessage ): void => {
  if (state.messages) {
    state.messages.push(data);
  }
};

export const updateVote = async (data: UserVote) => {
  state.votes[data.userId] = data.vote;

  if (data.userId === state.userId) state.vote = data.vote;
}

export const updateLead = async (data: string) => {
  state.leadId = data;
}

export const handleError = (err: Error) => {
  console.error(`connect_error due to ${err.message}`);
}
