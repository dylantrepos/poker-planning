<template>
    <main>
        <div> Game view </div>
        <LoadingItem :loading="loading">
            <CheckRoomItem 
              :is-logged-in="isLoggedIn"
              @submit-join-room="handleJoinRoom" 
            >
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
  
  import { emitJoinRoom } from "@/sockets/emitsFunctions";
  import { getCookie } from "@/utils/utils";
  import { checkRoomExists } from '@/utils/room';
  import { state } from '../sockets/sockets';
  import { connectToSocket } from "@/sockets/sockets";

  import type { UserInfo } from '@/types/UserType';
  import MessageItem from "@/components/game/MessageItem.vue";

  
  
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
    const roomExists = await checkRoomExists();
    const cookieData = getCookie();
    
    if (roomExists && cookieData.roomId === state.roomId) {
        if (state.connected) {
          isLoggedIn.value = true;
        } else {
          connectToSocket();
          handleJoinRoom(cookieData);
        }
      }
      
      loading.value = false;
    })
    
    
    // Methods
    const handleJoinRoom = async (userInfoData: UserInfo) => {
      await emitJoinRoom(userInfoData);

      isLoggedIn.value = true;
    };
</script>