<template>
  <div v-if="props.loading">Loading...</div>
  <slot v-else></slot>
</template>

<script setup lang="ts">

  type Props = {
    loading: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    loading: true
  });

</script>