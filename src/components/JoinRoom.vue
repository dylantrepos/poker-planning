<template>
  <form @submit.prevent="handleJoinForm">
    <input type="text" placeholder="Your name" v-model="usernameInput"/>
    <button>Join the room</button>
  </form>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { v4 as uuidv4 } from 'uuid';
  import { useRoute } from 'vue-router';

  import { addCookie } from '@/utils/utils'
  import { emitSocket } from '@/sockets/sockets';
  import { gameRoomList } from '@/store/data';

  const router = useRoute();
  const pageId = router.params.id;

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
    const userInfo = {
      userId: userId.value,
      gameId: gameId.value,
      username: usernameInput.value,
    }

    emitSocket('join-game', userInfo)
    
    console.log('userinfo : ', userInfo);
    addCookie('poker-planning', JSON.stringify(userInfo));

    emit('join-room');
  }


</script>

<style>

</style>