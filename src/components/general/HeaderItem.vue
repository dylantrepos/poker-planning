<template>
  <div class="header__container">
    <div 
      class="header__title"
      @click="redirectToHome"
    >
      Poker planning
    </div>
    <button
      class="button header__button"
      @click="handleCopyURL"
    >
      Share room
    </button>
  </div>
</template>

<script setup lang="ts">
   import { useRouter, useRoute } from 'vue-router';
   import { state } from '../../utils/state';
  
   import type { RoomId } from '../../types/GenericType';


   const router = useRouter();
   const route = useRoute();
   state.roomId = route.params.id as RoomId;

   // Methods 
   const redirectToHome = (): void => {
      router.push('/');
   };

   const handleCopyURL = () => {
      navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_ADDRESS}${route.fullPath}`);
   };
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

.header__container {
  height: 5rem;
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