<template>
    <main>
        <div> Game view </div>
        <LoadingItem :loading="loading">
            <CheckRoomItemVue 
              :room-id="roomId" 
              :is-logged-in="isLoggedIn"
              @submit-join-room="handleJoinRoom" 
            >
              <h3>Name : {{ state.username }} {{ state.role === 'lead' ?  '👑' : ''}}</h3>
  
              <UserListItem />
              <MessageItem />
              <VoteItemVue />
              <ChatItem />

              </CheckRoomItemVue>
        </LoadingItem>
    </main>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from "vue";
  import { useRoute } from "vue-router";
  
  import UserListItem from "@/components/game/UserListItem.vue";
  import ChatItem from '@/components/game/ChatItem.vue'
  import LoadingItem from "@/components/general/LoadingItem.vue";
  import CheckRoomItemVue from "@/components/room/CheckRoomItem.vue";
  import VoteItemVue from "@/components/game/VoteItem.vue";
  
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
  const userInfo = ref<UserInfo>();

  const route = useRoute();
  const roomId = route.params.id as string;

  // Life cycle
  onBeforeMount( async () => {
    const roomExists = await checkRoomExists(roomId);
    const cookieData = getCookie();
    
    if (roomExists && cookieData.roomId === roomId) {
        if (state.connected) {
          const {userId, roomId, username, role} = state
          userInfo.value = {
            userId,
            roomId,
            username,
            role,
          }

          isLoggedIn.value = true;
        } else {
          connectToSocket();
          handleJoinRoom({...cookieData, role: 'user'});
        }
    }

    loading.value = false;
  })
  

  // Methods
  const handleJoinRoom = async (userInfoData: UserInfo) => {
      const {userId, roomId, role, username} = userInfoData;

      emitJoinRoom(userInfoData);

      state.userId = userId;
      state.roomId = roomId;
      state.username = username;
      state.role = role;

      userInfo.value = userInfoData;

      isLoggedIn.value = true;
  };
</script>