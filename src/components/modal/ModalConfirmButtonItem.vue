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