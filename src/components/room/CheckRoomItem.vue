<template>
    <div v-if="state.connected">
      <slot></slot>
    </div>
    <RoomErrorItem v-else >
      <JoinRoomItem  />
    </RoomErrorItem>
</template>

<script setup lang="ts">
  import { state } from '@/utils/state';
  import JoinRoomItem from './JoinRoomItem.vue';
  import RoomErrorItem from './RoomErrorItem.vue';

</script>