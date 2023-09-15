<template>
  <main>
    <CheckServerItem>
      <h1>Welcome !</h1>
      <form @submit.prevent="redirectToGame">
        <input type="text" v-model="usernameInput" placeholder="Your name"/>
        <button>Create a room</button>
      </form>
    </CheckServerItem>
  </main>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { v4 as uuidv4 } from 'uuid';

  import { socket, connectToSocket } from '@/sockets/sockets';
  import { emitJoinRoom } from '@/sockets/emitsFunctions';
  import { addCookie } from "@/utils/utils";
  import { state } from "@/utils/state";

  import { checkServerState } from '@/utils/room';
  import CheckServerItem from "@/components/general/CheckServerItem.vue";
  import type { User } from '@/types/UserType';
  import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
  
  Chart.register(DoughnutController, ArcElement, Tooltip);

  const router = useRouter();
  const usernameInput = ref('');
  const userId = uuidv4();

  checkServerState();

  // Methods
  const redirectToGame = (): void => {
    connectToSocket();

    socket.on('connect', async () => {
      const userInfo: User = {
        connected: true,
        roomId: socket.id,
        userId: userId,
        userName: usernameInput.value,
      };
  
      emitJoinRoom(userInfo);

      state.leadId = userId;
      
      addCookie('poker-planning', JSON.stringify(userInfo))
  
      router.push(`/room/${socket.id}`);
    })

  }

</script>
