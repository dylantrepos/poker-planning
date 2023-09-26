<template>
  <slot v-if="state.roomExists"></slot>
  <main 
    v-else
    class="container"
  >
    <h1>
      Sorry !
    </h1>
    <p class="room-error__text">
      This room doesn't exist...
    </p>
    <button 
      class="button"
      @click="router.push('/')"
    >
      Create a room
    </button>
  </main>
</template>

<script setup lang="ts">
   import { state } from "@/utils/state";
   import { useRouter } from "vue-router";

   const router = useRouter();
</script>

<style lang="scss">
  .room-error__title {
    font-weight: 500;
  }

  .room-error__text {
    margin: 2rem;
    text-align: center;
  }
</style>