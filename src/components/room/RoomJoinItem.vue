<template>
  <main class="join-room__container">
    <h1 class="join-room_title">
      Join a room
    </h1>
    <p class="home-view_text">
      To join this game, <br>
      you must choose a name.
    </p>
    <form 
      class="join-room_form"
      @submit.prevent="handleJoinRoom"
    >
      <input 
        type="text"
        placeholder="Your name"
        class="text-input"
        v-model.trim="usernameInput"
        required
      />
      <button class="button">
        Join the room
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
   import { ref } from 'vue';
   import { v4 as uuidv4 } from 'uuid';

   import { addCookie } from '@/utils/utils';
   import { emitJoinRoom } from '@/sockets/emitsFunctions';

   import type { User } from '../../types/UserType';

   import useUserStore from '@/store/useUserStore';
   import useRoomStore from '@/store/useRoomStore';

   const usernameInput = ref('');
   const userStore = useUserStore();
   const roomStore = useRoomStore();
   

   // Methods 
   const handleJoinRoom = async (): Promise<void> => {
      if (usernameInput.value.length === 0) return;

      const userId = uuidv4();
    
      const userInfo: User = {
         roomId: roomStore.roomId,
         userId,
         userName: usernameInput.value,
         connected: true,
      };
    
      addCookie('poker-planning', JSON.stringify(userInfo));
      addCookie('poker-planning2', userId);
    
      await emitJoinRoom(userInfo);
      userStore.setUserConnectionStatus(true);
   };
</script>


<style lang="scss">
  .join-room__container {
    height: 100dvh;
    justify-content: center
  }

  .join-room_title {
    text-align: center;
  }

  .join-room_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1.5rem;
    margin-top: 3rem;
  }
</style>