<template>
  <main class="join-room__container">
    <HeaderItem :light="true" />
    <h1 class="home-view__title">
      Join a room
    </h1>
    <p class="home-view__text">
      To join this game, <br>
      you must choose a name.
    </p>
    <form 
      class="home-view__form"
      @submit.prevent="handleJoinRoom"
    >
      <div class="home-view__form-input">
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
        Join the room
      </button>
    </form>

    <GitItemVue />
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
   import GitItemVue from '@/components/general/GitItem.vue';
   import HeaderItem from "@/components/general/HeaderItem.vue";

   const usernameInput = ref('');
   const userStore = useUserStore();
   const roomStore = useRoomStore();
   const maxLength = 25;
   

   // Methods 
   const handleJoinRoom = async (): Promise<void> => {
      if (usernameInput.value.length === 0) return;

      const userId = uuidv4();
    
      const userInfo: Omit<User, 'connected'> = {
         roomId: roomStore.roomId,
         userId,
         userName: usernameInput.value,
      };
    
      addCookie('poker-planning', JSON.stringify(userInfo));

      console.log('room join item');
    
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