<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        class="modal__container"
        aria-modal="true"
        role="dialog"
        tabindex="-1"
        @click.self="store.closeModal"
        v-if="store.modalState?.component"
      >
        <component 
          :is="store.modalState?.component" 
          v-bind="store.modalState?.props"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
   import useModalStore from '@/store/useModalStore';
   import { onMounted, onUnmounted } from 'vue';
  
   const store = useModalStore();

   const keydownListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") store.closeModal();
   };

   onMounted(() => {
      document.addEventListener("keydown", keydownListener);
   });

   onUnmounted(() => {
      document.removeEventListener("keydown", keydownListener);
   });

</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal__container {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 500;
    width: 100vw;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.2);
    display: grid;
    place-items: center;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active,
  .modal-leave-active {
    transition: 0.25s ease all;
  }

</style>