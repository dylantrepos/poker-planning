<template>
  <div 
    class="table__player-card-line"
    :class="{
      [place]: true,
    }"
  >
    <div 
      class="table__player-card"
      :class="{
        '-played': roomStore.votes[user.userId],
        '-reveal': showCardResult,
      }"
    >
      <div 
        class="-back"
        :class="{
          '-reveal': showCardResult,
        }"
        :style="{
          background: `var(--card-background-${generalStore.settings.cardBackground})`
        }"
      >
      </div>
      <div 
        class="-front"
        :class="{
          '-reveal': showCardResult,
        }"
      >
        <p 
          v-if="cardValue !== ''"
          :card="cardValue"
          :class="{
            '-infinity': roomStore.votes[user.userId] === '∞',
            '-coffee': roomStore.votes[user.userId] === '☕️'
          }"
        >
          {{ cardValue }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
   import useGeneralStore from '@/store/useGeneralStore';
   import useRoomStore from '@/store/useRoomStore';
   import type { User } from '@/types/UserType';
   import { ref, watch } from 'vue';

   const roomStore = useRoomStore();
   const generalStore = useGeneralStore();
   const showCardResult = ref(false);
   const hideCard = ref(false);
   const cardValue = ref('');

   watch(
      () => roomStore.showCard, 
      () => {
         if (roomStore.showCard) {
            showCardResult.value = true;
            cardValue.value = roomStore.votes[props.user.userId];
         } else {
            hideCard.value = true;
            setTimeout(() => {
               showCardResult.value =  false;
               hideCard.value = false;
               cardValue.value = '';
            }, 2000);
         }
      }
   );

   type Props = {
      user: User;
      place: '-top' | '-left' | '-right' | '-bottom';
   }

   const props = defineProps<Props>();

</script>

<style lang="scss">
  @import '../../assets/variables';

  .table__player-card-line {
    z-index: 1;
    height: 3rem;
    width: 2rem;
    border-radius: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px solid white;
    outline-offset: 3px; 
  
    &.-top, &.-left, &.-right, &.-bottom {
      position: absolute;
    }
  
    &.-top {
      bottom: -4rem;

      .table__player-card {
        bottom: 40px;
        top: unset;
        
        &.-played {
          bottom: 0px;
          top: unset;
        }
      }
  
      @media (min-width: $m) {
        bottom: -4.5rem;
        right: unset;
      }
    }
  
    &.-left {
      right: -3rem;

      .table__player-card {
        right: 40px;
        top: unset;
        
        &.-played {
          right: 0px;
          top: unset;
        }
      }
  
      @media (min-width: $m) {
        right: -4.5rem;
        bottom: unset;
      }
    }
  
    &.-right {
      left: -3rem;

      .table__player-card {
        left: 40px;
        top: unset;
        
        &.-played {
          left: 0px;
          top: unset;
        }
      }
  
      @media (min-width: $m) {
        left: -4.5rem;
        top: unset;
      }
    }
  
    &.-bottom {
      top: -4rem;
  
      @media (min-width: $m) {
        top: -4.5rem;
        left: unset;
      }
    }
  
    .-infinity {
      font-size: 1.8rem;
    }
  
    .-coffee {
      font-size: 1rem;
      
      @media (min-width: $xs) {
        font-size: 1.3rem;
      }
    }
  }

  .table__player-card {
    height: 100%;
    width: 100%;
    border-radius: 3px;
    position: relative;
    top: 40px;
    opacity: 0;
    transition: all .5s ease-in-out;
    transform: rotate3d(1, 0, 0, 90deg);
    position: absolute;
    
    &.-played {
      transition: all .5s ease-in-out 1s;
      top: 0;
      opacity: 1;
      transform: rotate3d(1, 0, 0, 0deg);
    }

    .-back, .-front {
      height: 100%;
      width: 100%;
      border-radius: 3px;
      position: absolute;
    }
    
    .-back {
      background: repeating-linear-gradient(45deg, #402da4, #007bff 10px, #5f1fc2 10px, #07109f 20px);
      background-size: contain !important;
      background-position: center !important;
      // border: 2px solid #00000040;
      
      @media (min-width: $m) {
        // border: 0.1px solid #00000040;
      }

      &.-reveal {
        transition: all .5s ease-in-out .5s;
        transform: rotate3d(0, 1, 0, 90deg);
      }
    }

    .-front {
      background: linear-gradient(45deg, #d2d2d2 0%, #FFF 30%, #FFF 70%, #d2d2d2 100%);
      outline: 2px solid #FFF;
      top: 0;
      transform: rotate3d(0, 1, 0, 90deg);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      
      @media (min-width: $m) {
        outline-width: 1px;
      }
      
      &.-reveal {
        transition: all .5s linear 1s;
        transform: rotate3d(0, 1, 0, 0deg);
      }

      p {
        color: black;
        font-weight: 400;
        font-size: .9rem;
        line-height: 1;
        
        &::before, &::after {
          content: attr(card);
          position: absolute;
          top: .2rem;
          left: .2rem;
          font-weight: 200;
          font-size: .4rem;
        }

        &::after {
          top: unset;
          left: unset;
          bottom: .2rem;
          right: .2rem;
        }
      }
    }
  }

</style>  