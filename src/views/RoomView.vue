<template>
    <main>
        <div>
            Game view
        </div>
        <div v-if="!isLoaded">Loading...</div>
        <div v-else>
            <div v-if="isLoggedIn">
                <h3>Name : {{ userInfo?.username }}</h3>

                <UserListItem :room-id="roomId" />
                
                <form @submit.prevent="handlePostMessage">
                    <input type="text" v-model.trim="messageInput" placeholder="Your message...">
                    <button>
                        Test socket
                    </button>
                </form>
                <ChatItem :room-id="roomId"/>
            </div>
            
            <div v-else>
                <div v-if="doesRoomExists">
                    <JoinRoomItem @submit-join-room="handleJoinRoom" :room-id="roomId"/>
                </div>
                <div v-else>
                    <RoomErrorItem />
                </div>
            </div>
        </div>

    </main>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref } from "vue";
  import { useRoute } from "vue-router";
  
  import JoinRoomItem from "@/components/JoinRoomItem.vue";
  import RoomErrorItem from "@/components/RoomErrorItem.vue"
  import UserListItem from "@/components/UserListItem.vue";
  import ChatItem from '@/components/ChatItem.vue'
  
  import { emitMessage, emitJoinRoom } from "@/sockets/emitsFunctions";
  import { getCookie } from "@/utils/utils";
  import { checkRoomExists } from '@/utils/room';
  import type { UserInfo } from '@/types/UserType';
  import { state } from '../sockets/sockets';
  import { connectToSocket } from "@/sockets/sockets";
  
  
  // Variables
  const messageInput = ref('');
  const doesRoomExists = ref(false);
  const isLoggedIn = ref(false);
  const isLoaded = ref(false);
  const userInfo = ref<UserInfo>();

  const route = useRoute();
  const roomId = route.params.id as string;


  // Life cycle

  onBeforeMount( async () => {
    const roomExists = await checkRoomExists(roomId);
    const cookieData = getCookie();
    
    if (roomExists && cookieData.roomId === roomId) {
        if (!state.connected) connectToSocket();

        handleJoinRoom(cookieData);
    }

    doesRoomExists.value = roomExists;
    isLoaded.value = true;
  })
  

  // Methods
  const handleJoinRoom = async (userInfoData: UserInfo) => {
      emitJoinRoom(userInfoData);

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
            message: messageInput.value as string
        })

        messageInput.value = '';
    }
  } 
</script>@/sockets/emitsEventsMethods