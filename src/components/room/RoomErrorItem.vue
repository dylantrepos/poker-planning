<template>
    <div v-if="props.doesRoomExists">
        <slot></slot>
    </div>
    <div v-else>
        <h3>Sorry !</h3>
        <p>This room doesn't exist...</p>
        <button @click="router.push('/')">Create a room</button>
    </div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";

  type Props = {
    doesRoomExists: boolean;
  }

  const props = defineProps<Props>();

  const router = useRouter();
</script>