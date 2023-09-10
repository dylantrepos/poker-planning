<template>
  <div 
    style="margin-top: 5px; padding-top: 5px; border-top: 1px solid red;"
      v-for="msg in state.rooms[state.roomId]?.messages" 
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
  import { state } from '@/sockets/sockets';
</script>