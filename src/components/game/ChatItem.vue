<template>
  <div 
    style="margin-top: 5px; padding-top: 5px; border-top: 1px solid red;"
    v-for="msg in room.messages" 
    v-bind:key="msg.userName"
  >
    <b 
      style="color: blue;"
      :style="{
        'color': msg.userId === user.userId ? 'red' : 'blue'
      }"
    >
      {{ msg.userName }}:
    </b> 
    {{ msg.message }}
  </div>
</template>

<script setup lang="ts">
   import useRoomStore from '@/store/useRoomStore';
   import useUserStore from '@/store/useUserStore';

   const room = useRoomStore();
   const user = useUserStore();
</script>