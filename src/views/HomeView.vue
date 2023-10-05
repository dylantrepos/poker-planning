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
    <form 
      @submit.prevent="redirectToGame"
      class="home-view_form"
    >
      <input 
        v-model.trim="usernameInput"
        class="text-input"
        type="text"
        placeholder="Your name" 
        required
      />
      <button class="button">
        Create a room
      </button>
    </form>

    <a 
      class="home-view_author"
      href="https://github.com/dylantrepos"
      target="_blank"
      :class="{
        '-hovered': true,
      }"
    >
      <Github 
        :size="5"
        class="home-view_author-icon" 
      />
      <p
        class="home-view_author-name" 
        
      >
        @dylantrepos
      </p>
    </a>
  </main>
</template>

<script setup lang="ts">
   import { ref, onMounted } from 'vue';
   import { useRouter } from "vue-router";
   import { v4 as uuidv4 } from 'uuid';
   import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
   import { Github } from 'lucide-vue-next' ;
   
   import { socket, connectToSocket, disconnectFromSocket } from '@/sockets/sockets';
   import { emitJoinRoom } from '@/sockets/emitsFunctions';
   import { addCookie } from "@/utils/utils";

   import type { User } from '@/types/UserType';
   import useModalStore from '@/store/useModalStore';
  
   Chart.register(DoughnutController, ArcElement, Tooltip);

   const router = useRouter();
   const usernameInput = ref('');
   const userId = uuidv4();
   const modalStore = useModalStore();

   onMounted(() => {
      if (socket.connected) {
         disconnectFromSocket();
      }
      modalStore.closeModal();
   });

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
      
         addCookie('poker-planning', JSON.stringify(userInfo));
  
         router.push(`/room/${socket.id}`);
      });

   };

</script>

<style lang="scss">
  @import '../assets/variables'; 
  
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

  .home-view_author {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 1.5rem;
    height: 4rem;
    width: auto;
    gap: 0.5rem;
    text-decoration: none;
    
    @media (min-width: $m) {
      flex-direction: column;
      position: absolute;
      bottom: 2.5rem;
      height: 2rem;
      width: 10rem;

      &:hover {
        .home-view_author-icon {
          bottom: 50%;
          transform: translate(-50%, 50%) rotate3d(1, 0, 0, 0deg);
          pointer-events: all;
        }
        
        .home-view_author-name {
          top: -1.5rem;
          transform: translate(-50%, -50%) rotate3d(1, 0, 0, 90deg);
        }
      }
    }
  }

  .home-view_author-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid white;
    border-radius: 100px;
    padding: 0.4rem;
    
    @media (min-width: $xs) {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.6rem;
    }

    @media (min-width: $m) {
      position: absolute;
      left: 50%;
      width: 3rem;
      height: 3rem;
      border: 1px solid white;
      border-radius: 100px;
      padding: 0.6rem;
      transition: all .5s ease-in-out;
      left: 50%;
      bottom: -3rem;
      transform: translateX(-50%) rotate3d(1, 0, 0, 90deg);
      pointer-events: none;
    }
  }

  .home-view_author-name {
    height: auto;
    text-decoration: none;
    font-size: .8rem;
    
    @media (min-width: $xs) {
      font-size: 1rem;
    }
    
    @media (min-width: $m) {
      font-size: 1rem;
      position: absolute;
      
      transition: all .5s ease-in-out;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;

      
    }
  }
</style>