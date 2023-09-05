<template>
  <main>
    <h1>Welcome !</h1>
    <input type="text" v-model="usernameInput" placeholder="Your name"/>
    <button @click="redirectToGame">Create a room</button>
  </main>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { gameRoomList } from '../store/data';
  import { v4 as uuidv4 } from 'uuid';
  import { io } from 'socket.io-client';
  import { addCookie } from '../utils/utils'

  const router = useRouter();
  const usernameInput = ref('');
  const socket = io(import.meta.env.VITE_SERVER_ADDRESS)

  // Methods
  const redirectToGame = (): void => {
    let gameId = uuidv4();
    let userId = uuidv4();
    
    while (gameRoomList.includes(gameId)) {
      gameId = uuidv4();
    }

    gameRoomList.push(gameId);

    const userInfo = {
      userId,
      gameId,
      username: usernameInput.value,
    }

    socket.emit('create game', userInfo)

    addCookie('poker-planning', JSON.stringify(userInfo));

    router.push(`/game/${gameId}`);
  }

</script>
