<template>
    <main>
        <div> Game view </div>
        <LoadingItem :loading="loading">
          <div v-if="isLoggedIn">
              <h3>Name : {{ userInfo?.username }} {{ role === 'lead' ?  '👑' : ''}}</h3>
  
              <UserListItem />
              
              <form @submit.prevent="handlePostMessage">
                  <input type="text" v-model.trim="messageInput" placeholder="Your message...">
                  <button>
                      Test socket
                  </button>
              </form>
              <VoteItemVue />
              <ChatItem />
          </div>
          
          <div v-else>
              <CheckRoomItemVue :room-id="roomId" @submit-join-room="handleJoinRoom"/>
          </div>
        </LoadingItem>
    </main>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref, watch } from "vue";
  import { useRoute } from "vue-router";
  
  import UserListItem from "@/components/game/UserListItem.vue";
  import ChatItem from '@/components/game/ChatItem.vue'
  import LoadingItem from "@/components/general/LoadingItem.vue";
  import CheckRoomItemVue from "@/components/room/CheckRoomItem.vue";
  import VoteItemVue from "@/components/game/VoteItem.vue";
  
  import { emitMessage, emitJoinRoom } from "@/sockets/emitsFunctions";
  import { getCookie } from "@/utils/utils";
  import { checkRoomExists } from '@/utils/room';
  import { state } from '../sockets/sockets';
  import { connectToSocket } from "@/sockets/sockets";

  import type { Role, UserInfo } from '@/types/UserType';

  
  
  // Variables
  const messageInput = ref('');
  const doesRoomExists = ref(false);
  const isLoggedIn = ref(false);
  const loading = ref(true);
  const userInfo = ref<UserInfo>();

  const route = useRoute();
  const roomId = route.params.id as string;
  const role = ref();

  watch(
      () => state.rooms[roomId]?.userList,
      () => { 
        role.value = state.rooms[roomId]?.userList.find(user => user.userId === state.userId)?.role ?? 'user';
      }
    )

  // Life cycle
  onBeforeMount( async () => {
    const roomExists = await checkRoomExists(roomId);
    const cookieData = getCookie();
    
    if (roomExists && cookieData.roomId === roomId) {
        if (!state.connected) connectToSocket();

        handleJoinRoom(cookieData);
    }

    doesRoomExists.value = roomExists;
    loading.value = false;
  })
  

  // Methods
  const handleJoinRoom = async (userInfoData: UserInfo) => {
      emitJoinRoom(userInfoData);
      state.userId = userInfoData.userId;
      state.roomId = userInfoData.roomId;
      state.role = userInfoData.role;
      userInfo.value = userInfoData;
      isLoggedIn.value = true;
  };

  const handlePostMessage = (): void => {
    if (messageInput.value.length === 0) return;

    if (userInfo.value) {
        emitMessage({
            roomId, 
            userId: userInfo.value.userId as string, 
            username: userInfo.value.username as string,
            role: 'user',
            message: messageInput.value as string
        })

        messageInput.value = '';
    }
  } 
</script>