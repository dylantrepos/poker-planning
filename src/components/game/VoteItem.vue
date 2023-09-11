<template>
  <h4>Vote ({{ state.vote }})</h4>
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
  import { emitVote } from '@/sockets/emitsFunctions';
  import { state } from '@/utils/state';

  const voteAvailable = getPokerPossibilities();

  const handleVote = (vote: string): void => {
    const cookieData = getCookie();
    
    emitVote(vote);

    addCookie('poker-planning', JSON.stringify({...cookieData, vote}));
  }
</script>