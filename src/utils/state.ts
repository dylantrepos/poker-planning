import { reactive } from 'vue';
import type { State } from '../types/State';

export const state = reactive<State>({
  connected: false,
  userId: '',
  roomId: '',
  username: '',
  leadId: '',
  roomExists: false,
  vote: '',
  voteClose: false,
  messages: [],
  userList: {},
  votes: {}
});
