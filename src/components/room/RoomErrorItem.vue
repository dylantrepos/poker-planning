<template>
    <h3>Sorry !</h3>
    <p>This room doesn't exist...</p>
    <button @click="router.push('/')">Create a room</button>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";

  const router = useRouter();
</script>