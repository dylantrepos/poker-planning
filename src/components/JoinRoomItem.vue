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

  import { addCookie } from '../utils/utils';
  import { emitJoinRoom } from '../sockets/sockets';
  import type { UserInfo } from '../types/UserType';

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
    
    const userInfo = {
      roomId: props.roomId,
      userId,
      username: usernameInput.value
    };
    
    addCookie('poker-planning', JSON.stringify(userInfo));
    
    emit('submitJoinRoom', userInfo);

    // emitJoinRoom(userInfo);
  }
</script>