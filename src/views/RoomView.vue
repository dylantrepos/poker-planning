<template>
  <RoomNotExistsItem>
    <LoadingItem :loading="loading">
      <RoomItem v-if="userStore.isUserConnected" />
      <RoomJoinItem v-else />
    </LoadingItem>
  </RoomNotExistsItem>
</template>

<script setup lang="ts">
   import { onBeforeMount, ref } from "vue";
   import { useRoute } from "vue-router";

   import LoadingItem from "@/components/general/LoadingItem.vue";
   import RoomJoinItem from "@/components/room/RoomJoinItem.vue";
   import RoomItem from "@/components/room/RoomItem.vue";
   import RoomNotExistsItem from "@/components/room/RoomNotExistsItem.vue";
  
   import { connectToSocket } from '@/sockets/sockets';
   import { getCookie } from '@/utils/utils';
   import { emitJoinRoom, emitVote } from '@/sockets/emitsFunctions';
   
   import type { RoomId } from '@/types/GenericType';

   import useUserStore from '@/store/useUserStore';
   import useRoomStore from "@/store/useRoomStore";

   
   // Variables
   const userStore = useUserStore();
   const roomStore = useRoomStore();
   const loading = ref(true);
   const route = useRoute();
   
   roomStore.setRoomId(route.params.id as RoomId);

   // Life cycle
   onBeforeMount( async () => {
      if (roomStore.roomExists && getCookie().roomId === roomStore.roomId) {
         if (!userStore.isUserConnected) handleJoinRoom();
      }
      
      loading.value = false;
   });
    
    
   // Methods
   const handleJoinRoom = async () => {
      connectToSocket();
      console.log('before mount ');

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