import { getPokerPossibilities, getCookie, addCookie } from '../../utils/utils';
<template>
  <h4>Vote ({{ vote }})</h4>
  <button 
    v-for="vote in voteAvailable" 
    v-bind:key="vote"
    @click="handleVote(vote)"
  >
    {{ vote }}
  </button>
</template>

<script setup lang="ts">
  import { addCookie, getCookie, getPokerPossibilities } from '@/utils/utils';
  
  import { state } from '@/sockets/sockets';
  import { emitVote } from '../../sockets/emitsFunctions';
  import { ref, watch } from 'vue';

  const vote = ref('')

  watch(
    () => state.rooms[state.roomId]?.userList,
    () => {
      const userVotefound = state.rooms[state.roomId].userList.find(user => user.userId === state.userId);
      vote.value = userVotefound?.vote ?? state.vote ?? '';
    }
  )

  const voteAvailable = getPokerPossibilities();

  const handleVote = (vote: string): void => {
    const cookieData = getCookie();
    
    emitVote(vote);
    addCookie('poker-planning', JSON.stringify({...cookieData, vote}));
  }
</script>