import { reactive } from 'vue';
import type { State } from '../types/SocketType';

export const state = reactive<State>({
  connected: false,
  userId: '',
  roomId: '',
  username: '',
  leadId: '',
  roomExists: false,
  vote: '',
  voteClose: false,
  role: 'user',
  messages: [],
  userList: [],
  votes: {}
});
