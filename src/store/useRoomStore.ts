import type { Message } from "@/types/MessageType";
import type { User, UserList } from "@/types/UserType";
import type { VoteResults } from "@/types/VoteType";
import { defineStore } from "pinia";
import useUserStore from "./useUserStore";
import { connectToSocket } from "@/sockets/sockets";

type UserListOrdered = {
  xxs: User[][],
  sm: User[][],
  lg: User[][]
}

type Votes = Record<string, string>;

interface IRoomState {
  roomExists: boolean;
  roomId: string;
  leadId: string;
  userList: UserList;
  userListOrdered: UserListOrdered;
  isVoteClosed: boolean; 
  voteResults: VoteResults;
  votes: Votes;
  messages: Message[],
  
}

export default defineStore("room-store", {
  state: (): IRoomState => ({ 
    roomExists: false,
    roomId: '',
    leadId: '',
    userList: {},
    userListOrdered: {
      xxs: [],
      sm: [],
      lg: []
    },
    isVoteClosed: false,
    voteResults: {},
    votes: {},
    messages: [],
  }),
  actions: {
    setRoomExists() { this.roomExists = true; },
    setRoomId(roomId: string) { this.roomId = roomId; },
    setLeadId(leadId: string) { this.leadId = leadId; },
    setUserList(userList: UserList) { this.userList = userList; },
    setUserListOrdered(userList: UserListOrdered) { this.userListOrdered = userList; },
    setVoteState(isClosed: boolean) { this.isVoteClosed = isClosed; },
    setVoteResults(voteResults: VoteResults) { this.voteResults = voteResults; },
    setVotes(votes: Votes) { this.votes = votes; },
    resetVotes() {
      this.isVoteClosed = false;
      this.voteResults = {};
      this.votes = {};
    },
    setMessages(messages: Message[]) { this.messages = messages; },
    addMessages(messages: Message) { this.messages.push(messages); },
    initRoom(roomId: string, userId: string, userName: string) {
      const userStore = useUserStore();
      
      this.messages = [];
      this.roomId = roomId;
      this.userList = {};
      this.votes = {};
      this.messages = [];
      
      userStore.setUserId(userId);
      userStore.setUserName(userName);
      if (!userStore.isUserConnected) connectToSocket();
    }
  },
  getters: {}
});