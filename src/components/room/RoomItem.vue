<template>
  <h3>
    Name : {{ state.userName }}  {{ state.userId === state.leadId ?  ' 👑' : ''}}
  </h3>
  <button
    class="button"
    v-if="state.userId === state.leadId && !state.voteClose"
    @click="handleCloseVote"
  >
    Close vote
  </button>
  <button
    class="button"
    v-if="state.userId === state.leadId && state.voteClose"
    @click="handleOpenVote"
  >
    Open vote
  </button>
  <UserListItem />
  <VotesResultItem v-if="state.voteClose" />
  <MessageItem />
  <VoteItem />
  <ChatItem />
</template>

<script setup lang="ts">
  
   import UserListItem from "@/components/game/UserListItem.vue";
   import ChatItem from '@/components/game/ChatItem.vue';
   import VoteItem from "@/components/game/VoteItem.vue";
   import MessageItem from "@/components/game/MessageItem.vue";
   import VotesResultItem from "@/components/game/VotesResultItem.vue";
  
   import { state } from '@/utils/state';
   import { emitCloseVote, emitOpenVote } from '@/sockets/emitsFunctions';

   const handleCloseVote = () => {
      emitCloseVote();
   };

   const handleOpenVote = () => {
      emitOpenVote();
   };
</script>


<style lang="scss">
  .room-view__container {
    height: 100dvh;
  }
</style>