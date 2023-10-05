<template>
  <slot v-if="generalStore.isServerLive"></slot>
  <main 
    v-else
    class="container"
  >
    <h1 class="server-error__title">
      Ho, I'm so sorry !
    </h1>
    <p class="server-error__text">
      This awesome poker planning application is not avaible for the moment.
    </p>
    <p class="server-error__text">
      Please, try again later...
    </p>
  </main>
</template>

<script setup lang="ts">
   import useGeneralStore from '@/store/useGeneralStore';
   import { checkServerState } from '@/utils/room';
   import { onUpdated } from 'vue';
   
   const generalStore = useGeneralStore();

   onUpdated(() => {
      checkServerState();
   });

</script>

<style lang="scss">
  .server-error__title {
    margin-bottom: 2rem;
    text-align: center;
  }

  .server-error__text {
    margin: .8rem 2rem;
    text-align: center;
  }
</style>