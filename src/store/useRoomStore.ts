import type { Message } from "@/types/MessageType";
import type { User, UserList } from "@/types/UserType";
import type { VoteResults } from "@/types/VoteType";
import { defineStore } from "pinia";
import useUserStore from "./useUserStore";
import { connectToSocket } from "@/sockets/sockets";
import { addCookie, fakeData, getCookie } from "@/utils/utils";
import { getUserListPositionned } from '../utils/utils';
import useModalStore from "./useModalStore";

type UserListOrdered = {
  xxs: User[][],
  sm: User[][],
  lg: User[][]
}

type Votes = Record<string, string>;

interface IRoomState {
  roomExists: boolean;
  roomId: string;
  userList: UserList;
  userListOrdered: UserListOrdered;
  userListNoVote: User[];
  isVoteClosed: boolean; 
  showCard: boolean;
  voteResults: VoteResults;
  votes: Votes;
  messages: Message[],
}

const defaultUserListOrdered = {
  xxs: [],
  sm: [],
  lg: []
};

export default defineStore("room-store", {
  state: (): IRoomState => ({ 
    roomExists: false,
    roomId: '',
    userList: {},
    userListOrdered: { ...defaultUserListOrdered },
    userListNoVote: [],
    isVoteClosed: false,
    showCard: false,
    voteResults: {},
    votes: {},
    messages: [],
  }),
  actions: {
    setRoomExists() { this.roomExists = true; },
    setRoomId(roomId: string) { this.roomId = roomId; },
    setUserListOrdered(userList: UserListOrdered) { this.userListOrdered = userList; },
    setIsVoteClosed(isClosed = true) { 
      if (!isClosed) {
        this.resetVotes();
        this.setShowCard(false);
      }
      else {
        useModalStore().openResultModal();
      }

      this.isVoteClosed = isClosed; 
    },
    setVoteResults(voteResults: VoteResults) { this.voteResults = voteResults; },
    setVotes(votes: Votes) { 
      this.votes = votes; 

      this.updateUserListNoVote();
      this.updateVoteResults();
    },
    setShowCard(showCard: boolean) { this.showCard = showCard; },
    setMessages(messages: Message[]) { this.messages = messages; },
    async setUserList(userList: UserList) { 

      console.log('5 : ', userList);
      this.userList = userList; 
      this.updateUserListNoVote();
      console.log('6 : ');
      this.updateUserPosition();
      console.log('7 : ');
    },

    resetVotes() {
      const cookieData = getCookie();
      addCookie('poker-planning', JSON.stringify({...cookieData, vote: '\'\''}));

      this.votes = {};
      this.updateUserListNoVote();
      this.updateVoteResults();
    },
    addMessages(message: Message) { 
      if (this.messages) this.messages.push(message); 
    },
    initRoom(roomId: string, userId: string, userName: string) {
      const userStore = useUserStore();

      console.log('2 : ', this.userList);
      console.log('2 or : ', this.userListOrdered);
      
      this.messages = [];
      this.roomId = roomId;
      this.userList = {};
      this.userListOrdered = { ...defaultUserListOrdered };
      this.userListNoVote = [];
      this.votes = {};
      this.messages = [];
      this.isVoteClosed = false;
      this.showCard = false;

      console.log('2.1 : ', this.userList);
      console.log('2.1 or : ', this.userListOrdered);
      
      this.updateUserPosition();
      
      console.log('3 : ', this.userList);
      console.log('3 or : ', this.userListOrdered);

      userStore.setUserId(userId);
      userStore.setUserName(userName);
      if (!userStore.isUserConnected) connectToSocket();
    },
    resetRoom() {
      this.messages = [];
      this.roomId = '';
      this.userList = {};
      this.userListOrdered = { ...defaultUserListOrdered };
      this.userListNoVote = [];
      this.votes = {};
      this.messages = [];
      this.isVoteClosed = false;
      this.showCard = false;
    },
    updateVoteResults() {
      const results: VoteResults = {};
    
      for (const user of Object.values(this.userList)) {
        const vote = this.votes[user.userId];
        if (vote) {
          if (results[vote]) {
            results[vote].vote++;
            results[vote].users.push(user.userName);
          }
          else { 
            results[vote] = {
              vote: 1,
              users: [user.userName]
            };
          }
        }
      }
      
      this.setVoteResults(results);
    },
    updateUserPosition() {
      const userList = [
        ...this.getUserListSorted, 
        ...fakeData.slice(0, 0)
      ];

      const userListPositionned = getUserListPositionned(userList);

    
      this.setUserListOrdered(userListPositionned);
    },
    updateUserListNoVote() {
      this.userListNoVote = Object.values(this.userList).filter((user: User) => (!this.votes[user.userId] ?? false));
    }
  },
  getters: {
    getUserListSorted(): User[] {
      const userStore = useUserStore();
  
      const userListSorted = Object.values(this.userList).sort();

      console.log('4 : ', userListSorted);
      console.log('4 or : ', userListSorted);
          
      const userIndex = userListSorted.findIndex(user => user.userId === userStore.userId);
      const userElt = userListSorted.find(user => user.userId === userStore.userId);
      userListSorted.splice(userIndex, 1);
  
      if (userElt) userListSorted.unshift(userElt);

      // Set name to acceptable width
      userListSorted.forEach((user: User) => {
        if (user.userName.length > 12) {
           if (!user.userName.includes(' ')) {
              user.userName = `${user.userName.slice(0, 12)}...`;
           } else {
              user.userName = `${user.userName.slice(0, window.innerWidth >= 767 ? 24 : 14)}...`;
           }
        } 
     });
  
      return userListSorted;
    },
  }
});