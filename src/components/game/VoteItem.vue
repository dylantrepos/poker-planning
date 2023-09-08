import { getPokerPossibilities } from '../../utils/utils';
<template>
  <h4>Vote</h4>
  <button 
    v-for="vote in voteAvailable" 
    v-bind:key="vote"
    @click="handleVote(vote)"
  >
    {{ vote }}
  </button>
</template>

<script setup lang="ts">
  import { getPokerPossibilities } from '@/utils/utils';
  
  import { state } from '@/sockets/sockets';


  const voteAvailable = getPokerPossibilities();

  const emits = defineEmits<{
    (e: 'vote', vote: string): void
  }>();

  const handleVote = (vote: string): void => {
    console.log('vote : ', vote, state.userId, state.roomId);
  }
</script>