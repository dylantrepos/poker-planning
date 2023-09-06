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
  import { ref, watch } from "vue";
  import { useRouter } from "vue-router";
  import { socket, state } from "@/sockets/sockets";
  import { addCookie } from "@/utils/utils";
  import { v4 as uuidv4 } from 'uuid';

  const router = useRouter();
  const usernameInput = ref('');
  const myuuid = uuidv4();

  watch(
      () => state.connected,
      () => {
        if (socket.id) {
          
          const userInfo = {
            roomId: socket.id,
            userId: myuuid,
            username: usernameInput.value,
          };
          
          console.log('user : ', userInfo);
          socket.emit('create-room', userInfo);

          addCookie('poker-planning', JSON.stringify(userInfo))

          router.push(`/game/${socket.id}`);
        }
      }
    )

  // Methods
  const redirectToGame = (): void => {
    socket.connect();
  }

</script>
