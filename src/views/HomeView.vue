<template>
  <main>
    <h1>Welcome !</h1>
    <form @submit.prevent="redirectToGame">
      <input type="text" v-model="usernameInput" placeholder="Your name"/>
      <button>Create a room</button>
    </form>
  </main>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { socket, connectToSocket } from '@/sockets/sockets';
  import { addCookie } from "@/utils/utils";
  import { v4 as uuidv4 } from 'uuid';
  import { emitJoinRoom } from '../sockets/emitsFunctions';
  import { state } from "@/utils/state";
  import type { Role } from '../types/GenericType';

  const router = useRouter();
  const usernameInput = ref('');
  const userId = uuidv4();

  // Methods
  const redirectToGame = (): void => {
    connectToSocket();

    socket.on('connect', async () => {
      const userInfo = {
        roomId: socket.id,
        userId: userId,
        username: usernameInput.value,
        vote: '',
        role: 'lead' as Role,
        connected: true,
      };
  
      emitJoinRoom(userInfo);

      state.leadId = userId;
      
      addCookie('poker-planning', JSON.stringify(userInfo))
  
      router.push(`/room/${socket.id}`);
    })

  }

</script>
