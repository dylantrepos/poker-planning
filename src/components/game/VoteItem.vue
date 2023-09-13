<template>
  <h4>Vote ({{ state.vote }})</h4>
  <button 
    v-for="vote in voteAvailable" 
    v-bind:key="vote"
    :disabled="state.voteClose"
    @click="handleVote(vote as Vote)"
  >
    {{ vote }}
  </button>
</template>

<script setup lang="ts">
  import { addCookie, getCookie, getPokerPossibilities } from '@/utils/utils';
  import { emitVote } from '@/sockets/emitsFunctions';
  import { state } from '@/utils/state';
  import type { Vote } from '../../types/GenericType';

  const voteAvailable = getPokerPossibilities();

  const handleVote = (vote: Vote): void => {
    const cookieData = getCookie();
    
    emitVote(vote);

    addCookie('poker-planning', JSON.stringify({...cookieData, vote}));
  }
</script>