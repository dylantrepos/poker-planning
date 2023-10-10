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
      <div
        v-for="vote in voteAvailable" 
        v-bind:key="vote"
        class="modal-vote__card"
        :class="{
          '-reveal': returnCard,
          '-chosen': vote === currVote,
        }"
      >
        <div 
          class="modal-vote__cards-button -back"
          :style="{
            background: `var(--card-background-${generalStore.settings.cardBackground})`
          }"
        >
        </div>
        <button 
          :disabled="roomStore.isVoteClosed"
          @click="handleChangeVote(vote as Vote)"
          class="modal-vote__cards-button -front"
        >
          <span
            :class="{
              '-infinity': vote === '∞',
              '-coffee': vote === '☕️'
            }"
            :card="vote"
          >{{ vote }}</span>
        </button>
      </div>
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
   import useGeneralStore from '@/store/useGeneralStore';
   import type { Vote } from '@/types/GenericType';

   import { ref } from 'vue';
   
   const userStore = useUserStore();
   const generalStore = useGeneralStore();
   const roomStore = useRoomStore();
   const store = useModalStore();

   const currVote = ref<Vote>(roomStore.votes[userStore.userId] as Vote ?? '');
   const initialVote = ref<Vote>(roomStore.votes[userStore.userId] as Vote ?? '');
   const returnCard = ref(false);

   const voteAvailable = getPokerPossibilities();

   const handleChangeVote = (vote: Vote): void => {
      currVote.value = currVote.value === vote ? '' : vote;
   };

   const handleVote = (): void => {
      const cookieData = getCookie();
      emitVote(currVote.value);

      addCookie('poker-planning', JSON.stringify({...cookieData, vote: currVote.value}));

      
      if (initialVote.value === '') {
         returnCard.value = true;

         setTimeout(() => {
            returnCard.value = false;
            store.closeModal();
         }, 750);
      }  else {
         store.closeModal();
      }
      

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

  .modal-vote__card {
    position: relative;
    height: 5rem;
    width: 3rem;

    &.-reveal.-chosen {
      .-front {
        transition: all .2s ease-in-out;
        transform: rotate3d(0, 1, 0, 90deg);
      }
      
      .-back {
        transition: all .2s linear .2s;
        transform: rotate3d(0, 1, 0, 0deg);
      }
    }

    @media (min-width: $xxs) {
      height: 6rem;
      width: 4rem;
      border-radius: .4rem;

      &.-chosen {
        button {
          background: linear-gradient(180deg, #1dca02 0%, #1f5e12 100%);
        }
        
        span {
          color: white;
        }
      }

      &:hover {
        @media (min-width: $m) {

          &:not(.-chosen) button {
            outline: 2px solid #1dca02;
            transform: translateY(-3px);
            
            * {
              color: #1dca02;
            }
      
          }

          &.-chosen button {
            outline-color: red;
          }
        }
      }
    }
  }

  .modal-vote__cards-button {
    background: linear-gradient(45deg, #d2d2d2 0%, #FFF 30%, #FFF 70%, #d2d2d2 100%);
    // border: 1px solid #e0e0e0;
    // outline: 1px solid #FFF;
    border-radius: .4rem;
    pointer-events: all;
    cursor: pointer;
    transition: all .2s ease-in-out;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    
    span {
      font-size: 1rem;
      color: black;
      font-weight: 500;
      
      &::before, &::after {
        content: attr(card);
        position: absolute;
        top: .4rem;
        left: .4rem;
        font-weight: 200;
        font-size: .5rem;
      }

      &::after {
        top: unset;
        left: unset;
        bottom: .4rem;
        right: .4rem;
      }
      @media (min-width: $xxs) {
        font-size: 1.5rem;
        
        &::before, &::after {
          font-size: .6rem;
        }
      }
    }

    &.-front {
      outline: 2px solid #FFF;

      @media (min-width: $m) {
        outline-width: 1px;
      }
    }
    
    &.-back {
      background: repeating-linear-gradient(45deg, #402da4, #007bff 10px, #5f1fc2 10px, #07109f 20px);
      background-size: contain !important;
      background-position: center !important;
      transform: rotate3d(0, 1, 0, 90deg);
      // border: 2px solid #00000040;

      @media (min-width: $m) {
        border-width: 1px;
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