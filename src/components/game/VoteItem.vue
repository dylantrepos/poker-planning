<template>
  <h4>
    Vote ({{ roomStore.votes[userStore.userId] }})
  </h4>
  <button 
    v-for="vote in voteAvailable" 
    v-bind:key="vote"
    :disabled="roomStore.isVoteClosed"
    @click="handleVote((vote === roomStore.votes[userStore.userId] ? '' : vote) as Vote)"
    :style="{
      'background': vote === roomStore.votes[userStore.userId] ? 'green ' : 'transparent',
    }"
    class="button vote__button"
  >
    {{ vote }}
  </button>
</template>

<script setup lang="ts">
   import { addCookie, getCookie, getPokerPossibilities } from '@/utils/utils';
   import { emitVote } from '@/sockets/emitsFunctions';
  
   import type { Vote } from '../../types/GenericType';
   import useUserStore from '@/store/useUserStore';
   import useRoomStore from '@/store/useRoomStore';

   const userStore = useUserStore();
   const roomStore = useRoomStore();

   const voteAvailable = getPokerPossibilities();

   const handleVote = (vote: Vote): void => {
      const cookieData = getCookie();
    
      emitVote(vote);

      addCookie('poker-planning', JSON.stringify({...cookieData, vote}));
   };
</script>

<style lang="scss">
  .vote__button {
    padding: 1rem 2rem;
    color: white;
  }
</style>