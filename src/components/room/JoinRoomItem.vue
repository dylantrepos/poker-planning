<template>
  <h3>
    Join a room
  </h3>
  <form @submit.prevent="handleJoinRoom">
    <input type="text"
           placeholder="Your name"
           v-model="usernameInput" />
    <button>
      Join the room
    </button>
  </form>
</template>

<script setup lang="ts">
   import { ref } from 'vue';
   import { v4 as uuidv4 } from 'uuid';

   import { state } from '@/utils/state';
   import { addCookie } from '@/utils/utils';
   import { emitJoinRoom } from '@/sockets/emitsFunctions';

   import type { User } from '../../types/UserType';


   const usernameInput = ref('');

   // Methods 
   const handleJoinRoom = async (): Promise<void> => {
      if (usernameInput.value.length === 0) return;

      const userId = uuidv4();
    
      const userInfo: User = {
         roomId: state.roomId,
         userId,
         userName: usernameInput.value,
         connected: true,
      };
    
      addCookie('poker-planning', JSON.stringify(userInfo));
      addCookie('poker-planning2', userId);
    
      await emitJoinRoom(userInfo);

      state.connected = true;
    
   };
</script>