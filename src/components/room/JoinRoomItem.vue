<template>
  <h3>Join a room</h3>
  <form @submit.prevent="handleJoinRoom">
      <input type="text" placeholder="Your name" v-model="usernameInput"/>
      <button>Join the room</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { v4 as uuidv4 } from 'uuid';

  import { addCookie } from '@/utils/utils';
  import type { UserInfo } from '@/types/UserType';
  import { connectToSocket } from '@/sockets/sockets';


  type Props = {
    roomId: string,
  }

  const props = defineProps<Props>();

  const usernameInput = ref('');

  const emit = defineEmits<{
    (e: 'submitJoinRoom', userData: UserInfo): void
  }>()

  // Methods 
  const handleJoinRoom = (): void => {
    if (usernameInput.value.length === 0) return;

    const userId = uuidv4();
    
    const userInfo: UserInfo = {
      roomId: props.roomId,
      userId,
      role: 'user',
      username: usernameInput.value
    };
    
    addCookie('poker-planning', JSON.stringify(userInfo));
    
    connectToSocket();
    
    emit('submitJoinRoom', userInfo);
  }
</script>