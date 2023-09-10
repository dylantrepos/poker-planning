<template>
    <main>
        <div> Game view </div>
        <LoadingItem :loading="loading">
            <CheckRoomItem>
              <h3>Name : {{ state.username }}  {{ state.role === 'lead' ?  ' 👑' : ''}}</h3>
  
              <UserListItem />
              <MessageItem />
              <VoteItem />
              <ChatItem />

              </CheckRoomItem>
        </LoadingItem>
    </main>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref, watch } from "vue";
  import { useRoute } from "vue-router";``
  
  import UserListItem from "@/components/game/UserListItem.vue";
  import ChatItem from '@/components/game/ChatItem.vue'
  import LoadingItem from "@/components/general/LoadingItem.vue";
  import CheckRoomItem from "@/components/room/CheckRoomItem.vue";
  import VoteItem from "@/components/game/VoteItem.vue";
  import MessageItem from "@/components/game/MessageItem.vue";
  
  import { getCookie } from "@/utils/utils";
  import { checkRoomExists } from '@/utils/room';
  import { state, connectToSocket } from "@/sockets/sockets";;
  import { checkUserExists } from '../utils/room';
  
  
  // Variables
  const isLoggedIn = ref(false);
  const loading = ref(true);

  const route = useRoute();
  state.roomId = route.params.id as string;

  watch(
    () => state.rooms[state.roomId]?.userList,
    () => {
      const user = state.rooms[state.roomId].userList.find(user => user.userId === state.userId);
      state.role = user?.role ?? 'user';
    }
  )

  // Life cycle
  onBeforeMount( async () => {
    await checkRoomExists();
    
    if (state.roomExists && getCookie().roomId === state.roomId) {
        if (!state.connected) checkUserExists();
    }
      
    loading.value = false;
    isLoggedIn.value = state.connected;
  })
</script>