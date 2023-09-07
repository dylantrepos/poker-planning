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
    
                <div 
                    style="margin-top: 5px; padding-top: 5px; border-top: 1px solid red;"
                      v-for="msg in messageElts" 
                      v-bind:key="msg.username"
                >
                      <b 
                        style="color: blue;"
                        :style="{
                            'color': msg.userId === userInfo?.userId ? 'red' : 'blue'
                        }"
                    >
                        {{ msg.username }}:
                    </b> 
                {{ msg.message }}
                </div>
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
  
  import { socket, emitMessage, emitJoinRoom } from "@/sockets/sockets";
  import { getCookie } from "@/utils/utils";
  import { getAllMessages, checkRoomExists } from '@/utils/room';
  import type { UserMessage, UserInfo } from '@/types/UserType';
  
  
  // Variables

  const messageElts = ref<UserMessage[]>([]);
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
        socket.connect();
        
        emitJoinRoom(cookieData);
        getMessages();

        userInfo.value = cookieData;
        isLoggedIn.value = true; 
    }

    doesRoomExists.value = roomExists;
    isLoaded.value = true;
  })
  

  // Methods

  const getMessages = async (): Promise<void> => {
    messageElts.value = await getAllMessages(roomId);
  }

  const handleJoinRoom = async (userInfoData: UserInfo) => {
      socket.connect();

      emitJoinRoom(userInfoData);
      getMessages();

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


  // Sockets Events
  socket.on(`message`, ( message: UserMessage ) => {
      messageElts.value.push(message);
  })   

</script>