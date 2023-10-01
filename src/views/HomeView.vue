<template>
  <main  
    class="container"
  >
    <h1 class="home-view_title">
      Poker planning
    </h1>
    <p class="home-view_text">
      To start a game, <br>
      enter your name and share the link with other players
    </p>
    <p class="home-view_text">
      You will be the lead of the game, <br>
      but you give the role to any other player.
    </p>
    <form 
      @submit.prevent="redirectToGame"
      class="home-view_form"
    >
      <input 
        v-model="usernameInput"
        class="text-input"
        type="text"
        placeholder="Your name" 
      />
      <button class="button">
        Create a room
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
   import { ref } from "vue";
   import { useRouter } from "vue-router";
   import { v4 as uuidv4 } from 'uuid';
   import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
   
   import { socket, connectToSocket } from '@/sockets/sockets';
   import { emitJoinRoom } from '@/sockets/emitsFunctions';
   import { addCookie } from "@/utils/utils";

   import type { User } from '@/types/UserType';
   import useRoomStore from "@/store/useRoomStore";
  
   Chart.register(DoughnutController, ArcElement, Tooltip);

   const router = useRouter();
   const usernameInput = ref('');
   const userId = uuidv4();
   const roomStore = useRoomStore();

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
         roomStore.setLeadId(userId);
      
         addCookie('poker-planning', JSON.stringify(userInfo));
  
         router.push(`/room/${socket.id}`);
      });

   };

</script>

<style lang="scss">
  .home-view_title {
    margin-bottom: 2rem;
    font-weight: 500;
  }

  .home-view_text {
    margin: .8rem 2rem;
    text-align: center;
  }

  .home-view_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1.5rem;
    margin-top: 3rem;
  }
</style>