<template>
  <div 
    class="table__player"
    :class="{
      '-three': additionnalClasses?.three,
      '-large': additionnalClasses?.large,
      '-current': user.userId === userStore.userId
    }"
  >
    <CardItem
      :user="user"
      :place="place"
    />
    <p class="table__user-name">
      {{ user.userName }}
    </p>
    <div 
      v-if="user.userId === userStore.userId"
      class="table__user-card-light"
    ></div>
  </div>
</template>

<script setup lang="ts">
   import type { User } from '@/types/UserType';
   import CardItem from '@/components/game/CardItem.vue';
   import useUserStore from '@/store/useUserStore';

   const userStore = useUserStore();

   type Props = {
      user: User;
      additionnalClasses?: {
         three: boolean;
         large?: boolean;
      };
      place: '-top' | '-left' | '-right' | '-bottom';
   }

   defineProps<Props>();
</script>

<style lang="scss">
  @import '../../assets/variables'; 


  .table__player {
    width: 100%;
    max-width: 6rem;
    background-color: green;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 1rem .2rem;

    &.-current {
      .table__user-name {
        font-weight: 500;
      }

      box-shadow: 0px -15px 27px -8px white;
      animation: current-smoke 5s ease-in-out infinite reverse;
    }

    &.-large {
        height: 4.5rem;
      }

    @media (min-width: $m) {
      width: 8rem;
      max-width: 8rem;
      min-width: 8rem;

      &.-large {
        height: 5rem;
      }
    }
  }

  @keyframes current-smoke {
    0% {
      box-shadow: 0px -15px 50px -8px white;
    }
    25% {
      box-shadow: -5px -15px 50px -8px white;
    }
    50% {
      box-shadow: 5px -20px 50px -8px white;
    }
    75% {
      box-shadow: 0px -15px 50px -8px white;
    }
    100% {
      box-shadow: 0px -15px 50px -8px white;
    }
  }
  
  .table__user-name {
    font-size: .8rem;
    width: 100%;
    text-align: center;
    max-height: 6rem;
    overflow: hidden;

    @media (min-width: $m) {
      font-size: 1rem;
      max-height: 3rem;
    }
  }

  .table__player-card {
    height: 3rem;
    width: 2rem;
    background: grey;

    &.-top, &.-left, &.-right, &.-bottom {
      position: absolute;
    }

    &.-top {
      bottom: -4rem;

      @media (min-width: $m) {
        bottom: -4.5rem;
        right: unset;
      }
    }

    &.-left {
      right: -3rem;

      @media (min-width: $m) {
        right: -4.5rem;
        bottom: unset;
      }
    }

    &.-right {
      left: -3rem;

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
  }

  .table__user-card-light {
    // position: absolute;
    // top: -.5rem;
    // width: 5rem;
    // height: .5rem;
    // background-color: white;
  }
</style>  