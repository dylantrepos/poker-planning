<template>
  <div v-if="!state.serverLive">
    <h2>
      Ho, I'm so sorry !
    </h2>
    <p>
      This awesome poker planning application is not avaible for the moment !
    </p>
    <p>
      Please try again later...
    </p>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
   import { state } from '@/utils/state';
</script>