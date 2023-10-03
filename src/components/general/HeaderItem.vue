<template>
  <header class="header__container">
    <div 
      class="header__title"
      @click="router.push('/')"
    >
      Poker planning
    </div>
    <button
      class="button header__button"
      @click="handleCopyURL"
      ref="shareRoomBtn"
    >
      <Copy :size="18" />
      Share room
    </button>
  </header>
</template>

<script setup lang="ts">
   import { useRouter, useRoute } from 'vue-router';
   import { onMounted, ref, onUnmounted } from 'vue';  
   import { Copy } from 'lucide-vue-next';
  
   import useRoomStore from '@/store/useRoomStore';
   import { setMessageDefault, setMessageShareRoom } from '@/utils/bannerMessages';
   
   import type { RoomId } from '@/types/GenericType';

   const router = useRouter();
   const route = useRoute();
   const roomStore = useRoomStore();
   const shareRoomBtn = ref<HTMLDivElement>();

   roomStore.setRoomId(route.params.id as RoomId);

   // Methods 
   const handleCopyURL = () => {
      navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_ADDRESS}${route.fullPath}`);
   };

   // Life cycle
   onMounted(() => {
      shareRoomBtn.value?.addEventListener('mouseover', setMessageShareRoom);
      shareRoomBtn.value?.addEventListener('mouseout', setMessageDefault);
   });
    
   onUnmounted(() => {
      shareRoomBtn.value?.removeEventListener('mouseover', setMessageShareRoom);
      shareRoomBtn.value?.removeEventListener('mouseout', setMessageDefault);
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
  width: auto;
  font-size: .8rem;
  padding: .5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;

  > * { 
    pointer-events: none;
  }
  
  @media (min-width: $xs) {
    font-size: .9rem;
  }
}

.header__copy-icon {
  font-size: 12px;
}
</style>