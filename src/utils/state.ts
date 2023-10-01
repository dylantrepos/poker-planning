import { reactive } from 'vue';
import type { State } from '../types/State';

export const state = reactive<State>({
  userId: '',
  userName: '',
  
  roomExists: false,
  
  roomId: '',
  leadId: '',
  userList: {},
  userListOrdered: {
    xxs: [],
    sm: [],
    lg: []
  },

  messages: [],
  voteClose: false,
  voteResults: {},
  votes: {},
});
