<template>
    <main>
        <div> Game view </div>
        <button @click="handleCopyURL">Share room</button>
        <LoadingItem :loading="loading">
            <CheckRoomItem 
              :is-logged-in="state.connected"
            >
              <h3>Name : {{ state.username }}  {{ state.userId === state.leadId ?  ' 👑' : ''}}</h3>
  
              <UserListItem />
              <MessageItem />
              <VoteItem />
              <ChatItem />

              </CheckRoomItem>
        </LoadingItem>
    </main>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from "vue";
  import { useRoute } from "vue-router";``
  
  import UserListItem from "@/components/game/UserListItem.vue";
  import ChatItem from '@/components/game/ChatItem.vue'
  import LoadingItem from "@/components/general/LoadingItem.vue";
  import CheckRoomItem from "@/components/room/CheckRoomItem.vue";
  import VoteItem from "@/components/game/VoteItem.vue";
  import MessageItem from "@/components/game/MessageItem.vue";
  
  import { emitJoinRoom } from "@/sockets/emitsFunctions";
  import { getCookie } from "@/utils/utils";
  import { state } from '@/utils/state';
  import { checkRoomExists } from '@/utils/room';
  import { connectToSocket } from "@/sockets/sockets";
  
  
  // Variables
  const isLoggedIn = ref(false);
  const loading = ref(true);

  const route = useRoute();
  state.roomId = route.params.id as string;

  // Life cycle
  onBeforeMount( async () => {
    await checkRoomExists();
    
    if (state.roomExists && getCookie().roomId === state.roomId) {
        if (!state.connected) handleJoinRoom();
    }
      
    loading.value = false;
    isLoggedIn.value = state.connected;
  })
    
    
  // Methods
  const handleJoinRoom = async () => {
      connectToSocket();

      const cookieData = getCookie();
      
      if (cookieData) {
        emitJoinRoom(cookieData);
      }
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_ADDRESS}${route.fullPath}`);
  }
</script>