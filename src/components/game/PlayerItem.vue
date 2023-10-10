<template>
  <div 
    class="table__player"
    :class="{
      '-three': additionnalClasses?.three,
      '-large': additionnalClasses?.large,
      '-current': user.userId === userStore.userId,
      '-offline': !user.connected
    }"
    ref="tablePlayer"
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
   import { onBeforeUnmount, onMounted, onUpdated, ref } from 'vue';
   import { setMessageDisconnected, setMessageDefault } from '../../utils/bannerMessages';

   const userStore = useUserStore();
   const tablePlayer = ref<HTMLDivElement>();

   type Props = {
      user: User;
      additionnalClasses?: {
         three: boolean;
         large?: boolean;
      };
      place: '-top' | '-left' | '-right' | '-bottom';
   }

   const props = defineProps<Props>();

   const updateMessageUser = () => {
      setMessageDisconnected(props.user.userName);
   };

   onMounted(() => {
      if (!props.user.connected) {
         tablePlayer.value?.addEventListener('mouseover', updateMessageUser);
         tablePlayer.value?.addEventListener('mouseout', setMessageDefault);
      }
   });

   onBeforeUnmount(() => {
      tablePlayer.value?.removeEventListener('mouseover', updateMessageUser);
      tablePlayer.value?.removeEventListener('mouseout', setMessageDefault);
   });
    
   onUpdated(() => {
      if (!props.user.connected) {
         tablePlayer.value?.addEventListener('mouseover', updateMessageUser);
         tablePlayer.value?.addEventListener('mouseout', setMessageDefault);
      }
      else {
         tablePlayer.value?.removeEventListener('mouseover', updateMessageUser);
         tablePlayer.value?.removeEventListener('mouseout', setMessageDefault);

      }
   });

</script>

<style lang="scss">
  @import '../../assets/variables'; 


  .table__player {
    width: 100%;
    // max-width: 6rem;
    // background-color: green;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 1rem .2rem;

    &.-offline {
      .table__user-name {
        color: rgb(162, 162, 162);
      }
    }

    &.-current {
      .table__user-name {
        font-weight: 500;
      }

      // box-shadow: 0px -15px 27px -8px white;
      // animation: current-smoke 5s ease-in-out infinite reverse;
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
    pointer-events: none;

    @media (min-width: $xxs) {
      font-size: 1rem;
      max-height: 3rem;
    }
  }
</style>  