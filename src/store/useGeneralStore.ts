import { checkVoteIsOpen, getAllMessagesFromServer, getAllVotesFromServer, getLeadIdFromServer } from "@/utils/room";
import { defineStore } from "pinia";
import useUserStore from "./useUserStore";

interface IGeneralState {
  isServerLive: boolean;
  bannerMessage: string;
}

export default defineStore("general-store", {
  state: (): IGeneralState => ({ 
    isServerLive: true,
    bannerMessage: 'Waiting for vote...',
  }),
  actions: {
    setServerStatus(isLive: boolean) { this.isServerLive = isLive; },
    setBannerMessage(message: string) {
      this.bannerMessage = message;
    },
    async setConnectionToSocket(connected: boolean = true): Promise<void> {
      useUserStore().setUserConnectionStatus(true);

      if (!connected) {
        this.isServerLive = false;
        return;
      }
      
      await getAllMessagesFromServer();
      await getAllVotesFromServer();
      await getLeadIdFromServer();
      await checkVoteIsOpen();
    },
    setError(err: Error) {
      this.isServerLive = false;
  
      console.error(`Error: connection impossible due to ${err.message}`);
    }
  },
  getters: {}
});