import { checkVoteIsOpen, getAllMessagesFromServer, getAllVotesFromServer } from "@/utils/room";
import { defineStore } from "pinia";
import useUserStore from "./useUserStore";

interface IGeneralState {
  isServerLive: boolean;
  bannerMessage: string;
  screenSize: 'xxs' | 'xs' | 'm' | 'l' | 'xl' | 'xxl';
  screenWidth: number;
}

export default defineStore("general-store", {
  state: (): IGeneralState => ({ 
    isServerLive: true,
    bannerMessage: 'Waiting for vote...',
    screenWidth: window.innerWidth,
    screenSize: 'xs',
  }),
  actions: {
    setServerStatus(isLive: boolean) { 
      this.isServerLive = isLive; 
    },
    setBannerMessage(message: string) {
      this.bannerMessage = message;
    },
    updateScreenWidth() { 
      this.screenWidth = window.innerWidth; 
      this.screenSize = 
        window.innerWidth <= 380 ? 'xxs'
        : window.innerWidth < 500 ? 'xs'
        : window.innerWidth < 768 ? 'm'
        : window.innerWidth < 992 ? 'l'
        : window.innerWidth < 1400 ? 'xl'
        : 'xxl';
    },
    async setConnectionToSocket(connected: boolean = true): Promise<void> {
      useUserStore().setUserConnectionStatus(true);

      if (!connected) {
        this.isServerLive = false;
        return;
      }
      
      await getAllMessagesFromServer();
      await getAllVotesFromServer();
      await checkVoteIsOpen();
    },
    setError(err: Error) {
      this.isServerLive = false;
  
      console.error(`Error: connection impossible due to ${err.message}`);
    }
  },
  getters: {}
});