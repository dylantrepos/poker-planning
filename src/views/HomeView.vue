<template>
  <main  
    class="container"
  >
    <HeaderItem :light="true" />
    <h1 class="home-view__title">
      Create a room
    </h1>
    <p class="home-view__text">
      Enter your name <br>
      and share the link with other players
    </p>
    <form 
      @submit.prevent="redirectToGame"
      class="home-view__form"
    >
      <div class="home-view__form-input"
      >
        <input 
          v-model.trim="usernameInput"
          class="text-input"
          type="text"
          placeholder="Your name"
          :maxlength="maxLength" 
          required
        />
        <p>
          {{ maxLength - usernameInput.length }}
        </p>
      </div>
      <button class="button">
        Create a room
      </button>
    </form>

    <GitItemVue />
  </main>
</template>

<script setup lang="ts">
   import { ref, onMounted } from 'vue';
   import { useRouter } from "vue-router";
   import { v4 as uuidv4 } from 'uuid';
   import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js';
   
   import HeaderItem from "@/components/general/HeaderItem.vue";
   import { socket, connectToSocket, disconnectFromSocket } from '@/sockets/sockets';
   import { emitJoinRoom } from '@/sockets/emitsFunctions';
   import { addCookie } from "@/utils/utils";

   import type { User } from '@/types/UserType';
   import useModalStore from '@/store/useModalStore';
   import GitItemVue from '@/components/general/GitItem.vue';
   import useRoomStore from '@/store/useRoomStore';
  
   Chart.register(DoughnutController, ArcElement, Tooltip);

   const router = useRouter();
   const usernameInput = ref('');
   const userId = uuidv4();
   const modalStore = useModalStore();
   const maxLength = 25;

   const roomStore = useRoomStore();

   onMounted(() => {
      if (socket.connected) {
         disconnectFromSocket();
         socket.removeListener('connect');
      }

      roomStore.resetRoom();
      modalStore.closeModal();
   });

   // Methods
   const redirectToGame = (): void => {
      connectToSocket();

      socket.on('connect', async () => {
         const userInfo: Omit<User, 'connected'> = {
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
  
  .home-view__title {
    font-size: 2rem;
    font-weight: 300;
    margin-bottom: 1rem;
    
    @media (min-width: $xs) {
      font-size: 3rem;
    }
    
    @media (min-width: $m) {
      margin-bottom: 2.5rem;
    }
  }

  .home-view__text {
    margin: 0 2rem;
    text-align: center;
  }

  .home-view__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1.5rem;
    margin-top: 2rem;

    :focus {
      .home-view__form-input p {
        background-color: red;
      }
    }
  }

  .home-view__form-input {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    input {
      &:focus {
        
        @media (min-width: $xs) {
          & + p {
            opacity: 1;
            right: 0;
          }
        }
      }
    }

    p {
      position: absolute;
      right: 0;
      width: 3rem;
      height: 100%;
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #8080805e;
      font-size: 1rem;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      transition: all var(--transition-duration) ease-in-out;
      
      @media (min-width: $xs) {
        opacity: 0;
        right: -3rem;
      }
    }
  }
</style>