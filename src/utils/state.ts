import { reactive } from 'vue';
import type { State } from '../types/State';

export const state = reactive<State>({
  serverLive: true,
  connected: false,
  userId: '',
  roomId: '',
  username: '',
  leadId: '',
  roomExists: false,
  vote: '',
  voteClose: true,
  messages: [],
  userList: {},
  votes: {}
});
