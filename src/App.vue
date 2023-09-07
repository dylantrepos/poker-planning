<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderItem from './components/HeaderItem.vue';
</script>

<template>
  <header>
    <HeaderItem />
  </header>

  <RouterView />
</template>

<style scoped>
</style>
