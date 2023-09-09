<template>
    <main>
        <div> Game view </div>
        <LoadingItem :loading="loading">
            <CheckRoomItem 
              :room-id="roomId" 
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
import { emitVote } from '../sockets/emitsFunctions';

  
  
  // Variables
  const isLoggedIn = ref(false);
  const loading = ref(true);
  const userInfo = ref<UserInfo>();

  const route = useRoute();
  const roomId = route.params.id as string;

  watch(
    () => state.rooms[state.roomId]?.userList,
    () => {
      const user = state.rooms[state.roomId].userList.find(user => user.userId === state.userId);
      state.role = user?.role ?? 'user';
    }
  )

  // Life cycle
  onBeforeMount( async () => {
    const roomExists = await checkRoomExists(roomId);
    const cookieData = getCookie();
    
    if (roomExists && cookieData.roomId === roomId) {
        if (state.connected) {
          const {userId, roomId, username, role, vote} = state
          userInfo.value = {
            userId,
            roomId,
            username,
            role,
            vote,
          }

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
      const {userId, roomId, username, vote} = userInfoData;

      emitJoinRoom(userInfoData);
      emitVote(vote);

      state.userId = userId;
      state.roomId = roomId;
      state.username = username;
      state.vote = vote;

      userInfo.value = userInfoData;

      isLoggedIn.value = true;
  };
</script>