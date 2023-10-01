import { defineStore } from "pinia";

interface IUserState {
  isUserConnected: boolean;
  userId: string;
  userName: string;
}

export default defineStore("user-store", {
  state: (): IUserState => ({ 
    isUserConnected: false,
    userId: '',
    userName: '',
  }),
  actions: {
    setUserConnectionStatus(isConnected: boolean) { this.isUserConnected = isConnected; },
    setUserId(userId: string) { this.userId = userId; },
    setUserName(userName: string) { this.userName = userName; },
  },
  getters: {}
});