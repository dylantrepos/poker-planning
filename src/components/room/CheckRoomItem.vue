<template>
    <div v-if="state.connected">
      <slot></slot>
    </div>
    <RoomErrorItem v-else :does-room-exists="state.roomExists" >
      <JoinRoomItem  />
    </RoomErrorItem>
</template>

<script setup lang="ts">
  import JoinRoomItem from './JoinRoomItem.vue';
  import RoomErrorItem from './RoomErrorItem.vue';
  import { state } from '@/sockets/sockets';
</script>