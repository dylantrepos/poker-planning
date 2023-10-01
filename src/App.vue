<template>
  <ServerErrorItem>
    <RouterView />
    <ModalItem />
  </ServerErrorItem>
</template>

<script setup lang="ts">
   import { RouterView } from 'vue-router';
   import ServerErrorItem from '@/components/general/ServerErrorItem.vue';
   import ModalItem from './components/modal/ModalItem.vue';
</script>

