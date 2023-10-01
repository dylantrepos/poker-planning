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
    <p v-if="user.userId === roomStore.leadId">
      👑
    </p>
    <p class="table__user-name">
      {{ user.userName }}
    </p>
  </div>
</template>

<script setup lang="ts">
   import type { User } from '@/types/UserType';
   import CardItem from '@/components/game/CardItem.vue';
   import useUserStore from '@/store/useUserStore';
   import useRoomStore from '@/store/useRoomStore';

   const userStore = useUserStore();
   const roomStore = useRoomStore();

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
</style>  