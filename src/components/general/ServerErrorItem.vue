<template>
  <slot v-if="state.serverLive"></slot>
  <div v-else>
    <h1 class="check-server__title">
      Ho, I'm so sorry !
    </h1>
    <p class="check-server__text">
      This awesome poker planning application is not avaible for the moment.
    </p>
    <p class="check-server__text">
      Please, try again later...
    </p>
  </div>
</template>

<script setup lang="ts">
   import { state } from '@/utils/state';
</script>

<style lang="scss">
  .check-server__title {
    margin-bottom: 2rem;
    text-align: center;
  }

  .check-server__text {
    margin: .8rem 2rem;
    text-align: center;
  }
</style>