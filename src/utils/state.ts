import { reactive } from 'vue';
import type { State } from '../types/State';

export const state = reactive<State>({
  connected: false,
  leadId: '',
  messages: [],
  roomExists: false,
  roomId: '',
  serverLive: true,
  userId: '',
  userList: {},
  userListOrdered: {
    xxs: [],
    sm: [],
    lg: []
  },
  userName: '',
  voteClose: false,
  voteResults: {},
  votes: {},
});
