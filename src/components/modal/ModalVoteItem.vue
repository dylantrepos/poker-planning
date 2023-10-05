<template>
  <div class="modal-vote__container">
    <ModalCloseButton />
    <h2 class="modal-vote__title">
      Time to votes !
    </h2>
    <p class="modal-vote__description">
      Pick a card and wait for the result
    </p>
    <div class="modal-vote__cards-container">
      <button 
        v-for="vote in voteAvailable" 
        v-bind:key="vote"
        :disabled="roomStore.isVoteClosed"
        @click="handleChangeVote(vote as Vote)"
        class="modal-vote__cards-button"
        :class="{
          '-chosen': vote === currVote,
        }"
      >
        <!-- <Infinity v-if="vote === 'infinity'" />
        <Coffee  v-else-if="vote === 'coffee'" /> -->
        <span
          :class="{
            '-infinity': vote === '∞',
            '-coffee': vote === '☕️'
          }"
        >{{ vote }}</span>
      </button>
    </div>
    <ModalConfirmButton 
      text="Confirm vote"
      @click="handleVote" 
      :disabled="initialVote === currVote" 
    />
  </div>
</template>

<script setup lang="ts">
   import ModalCloseButton from '@/components/modal/ModalCloseButtonItem.vue';
   import ModalConfirmButton from '@/components/modal/ModalConfirmButtonItem.vue';
   //  import { Coffee, Infinity } from 'lucide-vue-next';
   import useModalStore from '@/store/useModalStore';

   import { addCookie, getCookie, getPokerPossibilities } from '@/utils/utils';
   import { emitVote } from '@/sockets/emitsFunctions';
   
   import useUserStore from '@/store/useUserStore';
   import useRoomStore from '@/store/useRoomStore';
   import type { Vote } from '@/types/GenericType';
   import { ref } from 'vue';
   
   const userStore = useUserStore();
   const roomStore = useRoomStore();
   const store = useModalStore();

   const currVote = ref<Vote>(roomStore.votes[userStore.userId] as Vote ?? '');
   const initialVote = ref<Vote>(roomStore.votes[userStore.userId] as Vote ?? '');

   const voteAvailable = getPokerPossibilities();

   const handleChangeVote = (vote: Vote): void => {
      currVote.value = currVote.value === vote ? '' : vote;
   };

   const handleVote = (): void => {
      const cookieData = getCookie();
      emitVote(currVote.value);

      addCookie('poker-planning', JSON.stringify({...cookieData, vote: currVote.value}));

      store.closeModal();
   };
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal-vote__container {
    background: linear-gradient(145deg, rgba(0, 0, 0, 0.938), rgba(0, 0, 0, 0.388));
    padding: 2rem 1rem;
    position: relative;
    
    border-radius: 1rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 95vw;
    max-width: 35rem;

    > * {
      color: #fff;
    }

    @media (min-width: $m) {
      max-width: 40rem;
    }

    @media (min-width: $l) {
      max-width: 45rem;

      .modal-vote__cards-container {
        width: 100%;
        grid-auto-flow: row;
        grid-template-columns: repeat(auto-fill, 5rem);
      }
    }
  }

  .modal-vote__title {
    font-size: 1.2rem;
    font-weight: 500;
    
    @media (min-width: $m) {
      font-size: 1.5rem;
    }
  }

  .modal-vote__description {
    font-size: 1rem;
    font-weight: 200;
    margin-top: 1rem;
    
    @media (min-width: $m) {
      font-size: 1.2rem;
    }
  }

  .modal-vote__cards-container {
    gap: 1rem ;
    padding: 1rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    width: 100%;
    
    @media (min-width: $xxs) {
      padding: 2rem 0 .5rem;
    }

    @media (min-width: $xs) {
      padding: 2rem 2rem .5rem;
    }
    
    @media (min-width: $m) {
      padding: 2rem 1rem 1rem;
    }

    @media (min-width: $l) {
      padding: 2rem 2rem 1rem;
    }
  }

  .modal-vote__cards-button {
    background: linear-gradient(180deg, #FFF 0%, #D4D4D4 100%);
    border: 1px solid #FFF;
    height: 5rem;
    width: 3rem;
    border-radius: .4rem;
    font-size: 1rem;
    font-weight: 500;
    pointer-events: all;
    cursor: pointer;
    transition: all .2s ease-in-out;

    * {
      color: black;
      font-weight: 500;
      stroke: black;
    }

    @media (min-width: $xxs) {
      font-size: 1.3rem;
      height: 6rem;
      width: 4rem;
    }
    
    &:hover {
      @media (min-width: $m) {
        border: 2px solid #1dca02;
        
        * {
          color: #1dca02;
        }
  
        &.-chosen { 
          border-color: red;
        }
      }
    }


    &.-chosen {
      background: linear-gradient(180deg, #1dca02 0%, #1f5e12 100%);
      
      * {
        color: white;
      }
    }

    .-infinity {
      font-size: 2.2rem;
    }

    .-coffee {
      font-size: 2rem;
    }
  }
</style>