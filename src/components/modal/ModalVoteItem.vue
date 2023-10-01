<template>
  <div class="inner">
    <ModalCloseButton />
    <h2>
      This is a modal window!
    </h2>
    <p>
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
   import ModalCloseButton from '@/components/modal/ModalCloseButtonItem.vue';
   
   type Props = {
      text: string;
   }

   defineProps<Props>();

</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .inner {
    background-color: white;
    padding: 1rem;
    
    border-radius: 1rem;
    
    display: flex;
    flex-direction: column;
    gap: 1.4rem;

    > * {
      color: #000;
    }
  }

  .inner > h2 {
    font-size: 3rem;
    font-weight: bold;
  }

  .inner > p {
    font-size: 1.8rem;
    font-weight: 300;
  }
</style>