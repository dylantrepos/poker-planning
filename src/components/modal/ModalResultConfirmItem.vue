<template>
  <div class="modal-result__container">
    <ModalCloseButton />
    <h2 class="modal-result__title">
      Vote results
    </h2>
    <p class="modal-result__description">
      {{
        Object.keys(roomStore.voteResults).length === 0 
          ? 'At least one vote is needed to close the vote'
          : 'Are you sure you want to show the result ?'
      }}
    </p>
    <div 
      class="modal-result__cards-container"
      v-if="Object.keys(roomStore.userListNoVote).length > 0"
    >
      <p class="modal-result__userList-title">
        Player(s) without vote : 
      </p>
      <ul>
        <li 
          v-for="user in roomStore.userListNoVote.filter(userElt => userElt.connected)"
          v-bind:key="user.userId"
          class="modal-result__user"
          :class="{
            '-current': user.userId === userStore.userId
          }"
        >
          {{ user.userName }}
        </li>
      </ul>
    </div>
    <ModalConfirmButton 
      text="Close the vote"
      @click="handleConfirm" 
      :disabled="Object.keys(roomStore.voteResults).length === 0"
    />
  </div>
</template>

<script setup lang="ts">
   import ModalCloseButton from '@/components/modal/ModalCloseButtonItem.vue';
   import ModalConfirmButton from '@/components/modal/ModalConfirmButtonItem.vue';
   import { emitCloseVote } from '@/sockets/emitsFunctions';
   import useRoomStore from '@/store/useRoomStore';
   import useUserStore from '@/store/useUserStore';

   const roomStore = useRoomStore();
   const userStore = useUserStore();

   const handleConfirm = () => {
      emitCloseVote();
   };

</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal-result__container {
    background: linear-gradient(145deg, rgba(0, 0, 0, 0.938), rgba(0, 0, 0, 0.388));
    padding: 2rem 1rem;
    position: relative;
    
    border-radius: 1rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    > * {
      color: #fff;
    }

    @media (min-width: $xxs) {
      padding: 2rem;
    }
  }

  .modal-result__title {
    font-size: 1.2rem;
    font-weight: 500;
    
    @media (min-width: $m) {
      font-size: 1.5rem;
    }
  }

  .modal-result__description {
    font-size: 1rem;
    font-weight: 300;
    margin-top: 1rem;
    // max-width: 15rem;
    
    @media (min-width: $m) {
      font-size: 1.2rem;
      font-weight: 200;
    }
  }
  
  .modal-result__userList-title {
    font-size: 1rem;
    font-weight: 400;
    margin: 1rem 0;
    
    @media (min-width: $m) {
      font-size: 1.2rem;
    }
  }

  .modal-result__userList {
    &.-current::after {
      content: 'ㅤ(You)';
      font-size: .8rem;
      font-weight: 100;
    }

  }

  .modal-result__cards-container {
    margin: 1rem 0;
  }
</style>