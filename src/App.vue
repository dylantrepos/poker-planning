<template>
  <ServerErrorItem>
    <RouterView />
  </ServerErrorItem>
</template>

<script setup lang="ts">
   import { RouterView } from 'vue-router';
   import ServerErrorItem from '@/components/general/ServerErrorItem.vue';
</script>

<style scoped lang="scss">

</style>
