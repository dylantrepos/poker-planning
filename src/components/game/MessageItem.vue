<template>
  <form @submit.prevent="handlePostMessage">
    <input type="text"
           v-model.trim="messageInput"
           placeholder="Your message...">
    <button>
      Test socket
    </button>
  </form>
</template>

<script setup lang="ts">
   import { ref } from 'vue';
   import { emitMessage } from '../../sockets/emitsFunctions';

   const messageInput = ref('');

   const handlePostMessage = (): void => {
      if (messageInput.value.length === 0) return;

      emitMessage(messageInput.value);

      messageInput.value = '';
   }; 
</script>