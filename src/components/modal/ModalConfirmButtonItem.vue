<template>
  <button
    class="button modal__confirm-button"
    @click="store.closeModal"
  >
    Confirm vote
  </button>
</template>

<script setup lang="ts">
   import useModalStore from '@/store/useModalStore';

   const store = useModalStore();
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal__confirm-button {
    width: auto;
    font-size: 1rem;
    padding: .5rem 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;

    &:hover {
      color: black;
    }
  }
</style>