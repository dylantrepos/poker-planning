<template>
  <main>
    <h1>Welcome !</h1>
    <button @click="redirectToGame">Game</button>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from 'uuid';

  const router = useRouter();

  // Methods
  const redirectToGame = (): void => {
    const myuuid = uuidv4();
    router.push(`/game/${myuuid}`);
  }

</script>
