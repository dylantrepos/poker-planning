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
  import { socket } from "@/sockets/sockets";
  import { addCookie } from "@/utils/utils";
  import { v4 as uuidv4 } from 'uuid';
  import type { UserInfo } from "@/types/UserType";
import { emitJoinRoom } from '../sockets/emitsFunctions';

  const router = useRouter();
  const usernameInput = ref('');
  const myuuid = uuidv4();

  // Methods
  const redirectToGame = (): void => {
    socket.connect();

    socket.on('connect', async () => {
      const userInfo: UserInfo = {
        roomId: socket.id,
        userId: myuuid,
        username: usernameInput.value,
        role: 'lead',
        vote: ''
      };

      await emitJoinRoom(userInfo);
  
      addCookie('poker-planning', JSON.stringify(userInfo))
  
      router.push(`/room/${socket.id}`);
    })

  }

</script>
