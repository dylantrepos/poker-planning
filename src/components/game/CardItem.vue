<template>
  <div 
    :class="['table__player-card', place]">
    <p>
      {{ roomStore.votes[user.userId] }}
    </p>
  </div>
</template>

<script setup lang="ts">
   import type { User } from '@/types/UserType';
   import useRoomStore from '@/store/useRoomStore';

   const roomStore = useRoomStore();

   type Props = {
      user: User;
      place: '-top' | '-left' | '-right' | '-bottom';
   }

   defineProps<Props>();

</script>

<style lang="scss">
  @import '../../assets/variables';

  .table__player-card {
    height: 3rem;
    width: 2rem;
    border-radius: 5px;
    background: grey;
    display: flex;
    justify-content: center;
    align-items: center;

    &.-top, &.-left, &.-right, &.-bottom {
      position: absolute;
    }

    &.-top {
      bottom: -4rem;

      @media (min-width: $m) {
        right: -4.5rem;
        bottom: unset;
      }
    }

    &.-left {
      right: -3rem;

      @media (min-width: $m) {
        bottom: -4.5rem;
        right: unset;
      }
    }

    &.-right {
      left: -3rem;

      @media (min-width: $m) {
        top: -4.5rem;
        left: unset;
      }
    }

    &.-bottom {
      top: -4rem;

      @media (min-width: $m) {
        left: -4.5rem;
        top: unset;
      }
    }
  }
</style>  