<template>
    <main>
        <div>
            Game view
        </div>
        <div v-if="!isLoaded">Loading...</div>
        <div v-else>
            <div v-if="isLoggedIn">
                <h3>Name : {{ userInfo?.username }}</h3>

                <h5>List users : </h5>
                <ul>
                    <li v-for="user in userInRoom" v-bind:key="user.userId">
                        {{ user.username ?? 'error' }} : <i>{{ user.userId ?? 'error' }}</i>
                    </li>
                </ul>
                
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
                    <h3>Join a room</h3>
                    <form @submit.prevent="handleJoinRoom">
                        <input type="text" placeholder="Your name" v-model="usernameInput"/>
                        <button>Join the room</button>
                    </form>
                </div>
                <div v-else>
                    <h3>Sorry !</h3>
                    <p>This room doesn't exist...</p>
                    <button @click="router.push('/')">Create a room</button>
                </div>
            </div>
        </div>

    </main>
</template>

<script setup lang="ts">
  import { onBeforeMount, ref, watch } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { socket, state, emitMessage } from "@/sockets/sockets";
  import { addCookie, getCookie } from "@/utils/utils";
  import { v4 as uuidv4 } from 'uuid';
  import type { UserMessage, UsersInRoom, UserInfo } from '@/types/UserType';
  import { getUserList, getAllMessages } from '@/utils/room';
  import { emitJoinRoom } from '../sockets/sockets';
  import { checkRoomExists } from '../utils/room';

    // Variables

    const messageElts = ref<UserMessage[]>([]);
    const messageInput = ref('');
    const usernameInput = ref('');
    const doesRoomExists = ref(false);
    const isLoggedIn = ref(false);
    const isLoaded = ref(false);
    const userInfo = ref<UserInfo>();
    const userInRoom = ref<UsersInRoom>([]);

    const route = useRoute();
    const router = useRouter();
    const roomId = route.params.id as string;

    watch(
      () => state.rooms,
      () => userInRoom.value = state.rooms
    )



    // Life cycle

    onBeforeMount(async () => {
      const roomExists = await checkRoomExists(roomId);
      const cookieData = getCookie();
      
      if (roomExists && cookieData.roomId === roomId) {
          connectToRoom();

          userInfo.value = cookieData;
          isLoggedIn.value = true; 
      }

      doesRoomExists.value = roomExists;
      isLoaded.value = true;
    })
    

    // Methods

    const handleJoinRoom = () => {
        const userId = uuidv4();
        
        userInfo.value = {
            roomId,
            userId,
            username: usernameInput.value,
        };
        
        addCookie('poker-planning', JSON.stringify(userInfo.value));

        connectToRoom();

        isLoggedIn.value = true;
    };

    const connectToRoom = async () => {
        socket.connect();

        socket.on('connect', async () => {
            if (userInfo.value) {
                emitJoinRoom(userInfo.value);

                const allMessages = await getAllMessages(roomId);
                messageElts.value = allMessages;
            }
        })

        const userList: UsersInRoom = await getUserList(roomId as string);
        userInRoom.value.push(...userList)
    }

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

</script>@/utils/room../utils/room