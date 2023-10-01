<template>
  <div v-if="loading">
    Loading...
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">

   type Props = {
      loading: boolean
   }

   withDefaults(defineProps<Props>(), {
      loading: true
   });

</script>