<template>
  <button
    @click="store.closeModal"
  >X</button>
</template>

<script setup lang="ts">
   import useModalStore from '@/store/useModalStore';

   const store = useModalStore();
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

</style>