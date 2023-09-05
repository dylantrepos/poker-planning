<template>
  <form @submit.prevent="handleJoinForm">
    <input type="text" placeholder="Your name" v-model="usernameInput"/>
    <button>Join the room</button>
  </form>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { addCookie } from '../utils/utils'
  import { v4 as uuidv4 } from 'uuid';
  import { io } from 'socket.io-client';
  import { gameRoomList } from '../store/data';
  import { useRoute } from 'vue-router';

  const router = useRoute();
  const pageId = router.params.id;

  const socket = io(import.meta.env.VITE_SERVER_ADDRESS)

  let gameId = ref();
  let userId = ref(uuidv4());

  const usernameInput = ref('');

  onMounted(() => {
    if (pageId) gameId.value = pageId;
    else generateRoom();
  })
  
  const emit = defineEmits(['join-room'])

  const generateRoom = () => {
    while (gameRoomList.includes(gameId.value)) {
      gameId.value = uuidv4();
    }
    gameRoomList.push(gameId.value);
  }


  const handleJoinForm = () => {
      socket.emit('join game', {
        userId: userId.value,
        gameId: gameId.value,
        username: usernameInput.value
      })
    
      const userInfo = {
        userId: userId.value,
        gameId: gameId.value,
        username: usernameInput.value,
      }
    
      console.log('userinfo : ', userInfo);
      addCookie('poker-planning', JSON.stringify(userInfo));

      emit('join-room');
  }


</script>

<style>

</style>