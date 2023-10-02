<template>
  <button
    class="modal-button__close"
    @click="store.closeModal"
  >
    <X />
  </button>
</template>

<script setup lang="ts">
   import useModalStore from '@/store/useModalStore';
   import { X } from 'lucide-vue-next';

   const store = useModalStore();
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal-button__close {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: all;
    cursor: pointer;
    background: transparent;
    
    svg {
      stroke: white;
      transition: stroke var(--transition-duration) ease-in-out;
    }

    &:hover {
      svg {
        stroke: red;
      }
    }
  }
</style>