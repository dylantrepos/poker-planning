<template>
    <div v-if="state.roomExists">
        <slot></slot>
    </div>
    <div v-else>
        <h3>Sorry !</h3>
        <p>This room doesn't exist...</p>
        <button @click="router.push('/')">Create a room</button>
    </div>
</template>

<script setup lang="ts">
  import { state } from "@/utils/state";
  import { useRouter } from "vue-router";

  const router = useRouter();
</script>