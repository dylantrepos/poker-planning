<template>
  <div 
    style="margin-top: 5px; padding-top: 5px; border-top: 1px solid red;"
      v-for="msg in messageElts" 
      v-bind:key="msg.username"
>
      <b 
        style="color: blue;"
        :style="{
            'color': msg.userId === userId ? 'red' : 'blue'
        }"
    >
        {{ msg.username }}:
    </b> 
{{ msg.message }}
</div>
</template>

<script setup lang="ts">
  import type { UserMessage } from '../types/UserType';
  import { onMounted, ref, watch } from 'vue';
  import { getCookie } from '../utils/utils';
  import { getAllMessages } from '../utils/room';
  import { state } from '@/sockets/sockets';

  type Props = {
    roomId: string;
  }

  const props = defineProps<Props>();

  const userId = ref('');
  const messageElts = ref<UserMessage[]>([]);

  watch(
    () => state.rooms[props.roomId]?.messages,
    () => {
      messageElts.value = state.rooms[props.roomId]?.messages;
    }
  )

  onMounted(async () => {
    const cookieData = getCookie();
    const messages = await getAllMessages(cookieData.roomId);

    state.rooms[props.roomId].messages = messages;

    userId.value = cookieData.userId;
    messageElts.value = messages;
    
  })
</script>