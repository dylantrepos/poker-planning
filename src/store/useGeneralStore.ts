import { checkVoteIsOpen, getAllMessagesFromServer, getAllVotesFromServer } from "@/utils/room";
import { defineStore } from "pinia";
import useUserStore from "./useUserStore";
import { addCookie, getCookieSettings, removeCookie } from "@/utils/utils";
import type { CardBackground, TableBackground } from '../types/UserType';

interface IGeneralState {
  isServerLive: boolean;
  bannerMessage: string;
  screenSize: 'xxs' | 'xs' | 'm' | 'l' | 'xl' | 'xxl';
  screenWidth: number;
  settings: {
    tableBackground: TableBackground;
    cardBackground: CardBackground;
  };
}

export default defineStore("general-store", {
  state: (): IGeneralState => ({ 
    isServerLive: true,
    bannerMessage: 'Waiting for vote...',
    screenWidth: window.innerWidth,
    screenSize: 'xs',
    settings: {
      tableBackground: 'green',
      cardBackground: 'stripe-purple'
    }
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
    async setConnectionToSocket(connected = true): Promise<void> {
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
    },
    setTableBackground(color?: TableBackground) {
      const cookieSettings = getCookieSettings();

      if (color && color !== 'green') {
        this.settings.tableBackground = color;
        addCookie('poker-planning-settings', JSON.stringify({
          ...cookieSettings,
          tableBackground: color
        }));
      } else {
        this.settings.tableBackground = 'green';
        
        if (cookieSettings.tableBackground) {
          delete cookieSettings.tableBackground;  
        }

        if (Object.keys(cookieSettings).length > 0) {
          addCookie('poker-planning-settings', JSON.stringify({
            ...cookieSettings
          }));
        } else {
          removeCookie('poker-planning-settings');
        }

      }
    },
    setCardBackground(color?: CardBackground) {
      const cookieSettings = getCookieSettings();

      if (color && color !== 'stripe-purple') {
        this.settings.cardBackground = color;
        addCookie('poker-planning-settings', JSON.stringify({
          ...cookieSettings,
          cardBackground: color
        }));
      } else {
        this.settings.cardBackground = 'stripe-purple';
        
        if (cookieSettings.cardBackground) {
          delete cookieSettings.cardBackground;  
        }

        if (Object.keys(cookieSettings).length > 0) {
          addCookie('poker-planning-settings', JSON.stringify({
            ...cookieSettings
          }));
        } else {
          removeCookie('poker-planning-settings');
        }

      }
    }
  },
  getters: {}
});