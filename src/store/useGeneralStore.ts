import { defineStore } from "pinia";

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
  },
  getters: {}
});