<template>
  <button
    class="button modal__confirm-button"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
   type Props = {
      text: string;
   }

   defineProps<Props>();
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal__confirm-button {
    width: fit-content;
    font-size: 1rem;
    padding: .5rem 1.5rem;
    display: flex; 
    justify-content: center;
    align-items: center;
    gap: .5rem;
    margin-top: 1.5rem;
    transition: all .2s ease-in-out;

    &:hover:not(:disabled) {
      color: black;
      background: white;
    }

    &:disabled {
      border-color: grey;
      color: grey;
      cursor: not-allowed;
      &:hover {
        background: transparent;
      }
    }
  }
</style>