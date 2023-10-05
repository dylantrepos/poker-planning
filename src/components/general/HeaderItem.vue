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
      :class="{
        '-animate': Object.keys((roomStore.userList)).length === 1 && allowAnim,
        '-copy': copySuccess
      }"
      @click="handleCopyURL"
      ref="shareRoomBtn"
    >
      <CopyCheck :size="18"
                 v-if="copySuccess" />
      <Copy :size="18"
            v-else />
      Share room
    </button>
  </header>
</template>

<script setup lang="ts">
   import { useRouter, useRoute } from 'vue-router';
   import { onMounted, ref, onUnmounted } from 'vue';  
   import { Copy, CopyCheck } from 'lucide-vue-next';
  
   import useRoomStore from '@/store/useRoomStore';
   import { setMessageDefault, setMessageShareRoom } from '@/utils/bannerMessages';
   import { setMessageCopySuccess } from '../../utils/bannerMessages';
   
   import type { RoomId } from '@/types/GenericType';

   const router = useRouter();
   const route = useRoute();
   const roomStore = useRoomStore();
   const shareRoomBtn = ref<HTMLDivElement>();
   const allowAnim = ref(true);
   const copySuccess = ref(false);

   roomStore.setRoomId(route.params.id as RoomId);

   // Methods 
   const handleCopyURL = () => {
      copySuccess.value = true;

      setMessageCopySuccess();

      setTimeout(() => {
         copySuccess.value = false;
         setMessageDefault();
      }, 2000);

      navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_ADDRESS}${route.fullPath}`);

   };

   const disallowAnim = () => {
      allowAnim.value = false;
      shareRoomBtn.value?.removeEventListener('mouseover', disallowAnim);
   };

   const setMessage = () => {
      if (!copySuccess.value) setMessageDefault();
   };

   // Life cycle
   onMounted(() => {
      shareRoomBtn.value?.addEventListener('mouseover', setMessageShareRoom);
      shareRoomBtn.value?.addEventListener('mouseout', setMessage);
      shareRoomBtn.value?.addEventListener('mouseover', disallowAnim);
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
  width: 100%;
  
  @media (min-width: $xs) {
    padding: 0 2rem;  
  }

  @media (min-width: $xl) {
    padding: 0 4rem;  
  }
}

.header__title {
  color: red;
  font-weight: 500;
  cursor: pointer;
}

.header__button {
  width: auto;
  font-size: .8rem;
  padding: .5rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;

  &.-animate {
    animation: share-button-anim 3s ease-in-out infinite;
  }

  &.-copy {
    // border-color: green;

    background: green;
    color: white;

    svg {
      stroke: white;
    }
  }

  > * { 
    pointer-events: none;
  }
  
  @media (min-width: $xs) {
    font-size: .9rem;
  }
}

@keyframes share-button-anim {
  0%, 100%, 30%, 80% {
    // transform: scale(1);
    box-shadow: 
    0 0 .2rem #ffffff00,
            0 0 .2rem #ffffff00,     
            0 0 2rem #bb13fe00,
            0 0 0.8rem #bb13fe00,
            0 0 2.8rem #bb13fe00,
            inset 0 0 1.3rem #bb13fe00; ;
  }
  50%, 60% {
    // transform: scale(1.1);
    box-shadow: 
            0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #efefef,
            0 0 0.8rem #efefef,
            0 0 2.8rem #efefef,
            inset 0 0 1.3rem #efefef;
  }
}

.header__copy-icon {
  font-size: 12px;
}
</style>