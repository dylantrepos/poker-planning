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

  const router = useRouter();
  const usernameInput = ref('');
  const myuuid = uuidv4();

  // Methods
  const redirectToGame = (): void => {
    socket.connect();

    socket.on('connect', () => {
      const userInfo: UserInfo = {
        roomId: socket.id,
        userId: myuuid,
        username: usernameInput.value,
      };
      
      socket.emit('join-room', userInfo);
  
      addCookie('poker-planning', JSON.stringify(userInfo))
  
      router.push(`/room/${socket.id}`);
    })

  }

</script>
