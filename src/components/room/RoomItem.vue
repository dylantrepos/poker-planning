<template>
  <main>
    <HeaderItem />
    <div class="room-view__info-text">
      {{state.voteClose ? 'Vote closed ! Waiting for new game...' : 'Waiting for votes...'}}
    </div>
    <TableItem />
    <!-- <div class="room-view__buttons-container">
      <div class="room-view__button-close"></div>
      <div class="room-view__button-vote">
        <div class="room-view__button-vote-content"></div>
      </div>
      <div class="room-view__button-lead"></div>
    </div> -->
    <!-- <div class="room-view__table-container">
    </div> -->

    <div class="room-toRemove">
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
    </div>
  </main>
</template>

<script setup lang="ts">
  
   import UserListItem from "@/components/game/UserListItem.vue";
   import ChatItem from '@/components/game/ChatItem.vue';
   import VoteItem from "@/components/game/VoteItem.vue";
   import MessageItem from "@/components/game/MessageItem.vue";
   import VotesResultItem from "@/components/game/VotesResultItem.vue";
   import TableItem from "@/components/game/TableItem.vue";
  
   import { state } from '@/utils/state';
   import { emitCloseVote, emitOpenVote } from '@/sockets/emitsFunctions';
   import HeaderItem from "../general/HeaderItem.vue";

   const handleCloseVote = () => {
      emitCloseVote();
   };

   const handleOpenVote = () => {
      emitOpenVote();
   };
</script>


<style lang="scss">
  @import '../../assets/variables'; 

  .room-view__container {
    height: 100dvh;
  }
  
  .room-view__table-container {
    display: flex;
    flex-direction: column;
    height: calc(100dvh - var(--header-height));
    position: relative;
  }

  .room-view__info-text {
    // height: 4rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.473) 50%, rgba(0,0,0,0) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    max-height: 3rem;
    
    @media (min-width: $m) {
      height: 4rem;
      max-height: 4rem;
      padding: 1rem;
    }
  }
  
  .room-view__buttons-container {
    width: 100%;
    height: 15dvh;
    min-height: 6rem;
    max-height: 8rem;
    padding: 5%;
    background-color: black;
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    gap: 1rem;

    @media (min-width: $m) {
      position: absolute;
      width: 15dvw;
      right: 2.5dvw;
      top: calc(50% + 5rem);
      transform: translateY(-50%);
      flex-direction: column;
      height: 450px;
      padding: 2rem;
      max-height: unset;
      max-width: unset;
      background-color: yellow;
    }
  }
  
  .room-view__button {

    &-close, &-lead {
      width: 15dvw;
      aspect-ratio: 1;
      min-height: 3rem;
      min-width: 3rem;
      max-height: 4rem;
      max-width: 4rem;
      border-radius: 100px;
      background-color: red;
      border: white 1px solid;
    }

    &-vote {
      width: 50dvw;
      height: 100%;
      min-width: 9rem;
      max-width: 14rem;
      background-color: grey;
      position: relative;
      
      &-content {
        height: 14rem;
        width: 100%;
        border-radius: 1000px;
        aspect-ratio: 1;
        border: white 1px solid;
        background-color: rgb(255, 170, 0);
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .room-toRemove {
    position: absolute;
    top: 150dvh;
  }
</style>