<template>
  <RoomNotExistsItem>
    <LoadingItem :loading="loading">
      <RoomItem v-if="state.connected" />
      <JoinRoomItem v-else />
    </LoadingItem>
  </RoomNotExistsItem>
</template>

<script setup lang="ts">
   import { onBeforeMount, ref } from "vue";
   import { useRoute } from "vue-router";

   import LoadingItem from "@/components/general/LoadingItem.vue";
   import JoinRoomItem from "@/components/room/JoinRoomItem.vue";
   import RoomItem from "@/components/room/RoomItem.vue";
   import RoomNotExistsItem from "@/components/room/RoomNotExistsItem.vue";
  
   import { state } from '@/utils/state';
   import { connectToSocket } from '@/sockets/sockets';
   import { getCookie } from '@/utils/utils';
   import { emitJoinRoom, emitVote } from '@/sockets/emitsFunctions';
   
   import type { RoomId } from '@/types/GenericType';
  
   // Variables
   const loading = ref(true);
   const route = useRoute();
   state.roomId = route.params.id as RoomId;

   // Life cycle
   onBeforeMount( async () => {
      if (state.roomExists && getCookie().roomId === state.roomId) {
         if (!state.connected) handleJoinRoom();
      }
      
      loading.value = false;
   });
    
    
   // Methods
   const handleJoinRoom = async () => {
      connectToSocket();

      const cookieData = getCookie();
      
      if (cookieData) {
         emitJoinRoom(cookieData);
         emitVote(cookieData.vote);
      }

   };
</script>


<style lang="scss">
  .room-view__container {
    height: 100dvh;
  }
</style>