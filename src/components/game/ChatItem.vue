<template>
  <div 
    style="margin-top: 5px; padding-top: 5px; border-top: 1px solid red;"
      v-for="msg in messageElts" 
      v-bind:key="msg.username"
>
      <b 
        style="color: blue;"
        :style="{
            'color': msg.userId === state.userId ? 'red' : 'blue'
        }"
    >
        {{ msg.username }}:
    </b> 
{{ msg.message }}
</div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  
  import type { UserMessage } from '@/types/UserType';
  import { getAllMessages } from '@/utils/room';
  import { state } from '@/sockets/sockets';

  const messageElts = ref<UserMessage[]>([]);

  watch(
    () => state.rooms[state.roomId]?.messages,
    () => {
      messageElts.value = state.rooms[state.roomId]?.messages;
    }
  )

  onMounted(async () => {
    const messages = await getAllMessages(state.roomId);

    if (state.rooms[state.roomId]) {
      state.rooms[state.roomId].messages = messages;
    }
    messageElts.value = messages;
    
  })
</script>