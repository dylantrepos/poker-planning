<template>
  <header class="header__container">
    <div 
      class="header__title"
      @click="redirectToHome"
    >
      Poker planning
    </div>
    <button
      class="button header__button"
      @click="handleCopyURL"
      ref="shareRoomBtn"
    >
      Share room
    </button>
  </header>
</template>

<script setup lang="ts">
   import { useRouter, useRoute } from 'vue-router';
  
   import type { RoomId } from '../../types/GenericType';
   import { onMounted, ref } from 'vue';  
   import useGeneralStore from '@/store/useGeneralStore';
   import useRoomStore from '@/store/useRoomStore';


   const router = useRouter();
   const route = useRoute();
   const shareRoomBtn = ref<HTMLDivElement>();

   const generalStore = useGeneralStore();

   const roomStore = useRoomStore();

   roomStore.setRoomId(route.params.id as RoomId);

   // Methods 
   const redirectToHome = (): void => {
      router.push('/');
   };

   const handleCopyURL = () => {
      navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_ADDRESS}${route.fullPath}`);
   };

   onMounted(() => {
      shareRoomBtn.value?.addEventListener('mouseover', () => {
         generalStore.setBannerMessage(
            'Copy the link and share it to invite more players'
         );
      });
      shareRoomBtn.value?.addEventListener('mouseout', () => {
         generalStore.setBannerMessage(
            roomStore.isVoteClosed ? 'Vote closed ! Waiting for new game...' : 'Waiting for votes...'
         );
      });
   });

</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

.header__container {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  
  @media (min-width: $xs) {
    margin: 0 2rem;  
  }
}

.header__title {
  color: red;
  font-weight: 500;
}

.header__button {
  width: 150px;
  font-size: .8rem;
  padding: .5rem 2rem;
}
</style>