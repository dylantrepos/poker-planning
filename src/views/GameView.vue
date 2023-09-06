<template>
    <main>
        <div>
            Game view
        </div>
        <div v-if="!isLoaded">Loading...</div>
        <div v-else>
            <div v-if="isLoggedIn">
                <h3>Name : {{ userInfo.username }}</h3>

                <h5>List users : </h5>
                <ul>
                    <li v-for="user in userInRoom" v-bind:key="user">
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
                  <b style="color: blue;">{{ msg.username }} :</b> {{ msg.message }}
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
    import { onBeforeMount, ref } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { emitSocket, socket, state } from "@/sockets/sockets";
    import { addCookie, getCookie } from "@/utils/utils";
    import { v4 as uuidv4 } from 'uuid';

    // Types

    type SocketDataReceived = {
        username: string;
        message: string;
    }

    type ConnectRoom = {
        roomId: string;
        userId: string;
        username: string;
    }


    // Variables

    const messageElts = ref<SocketDataReceived[]>([]);
    const messageInput = ref('');
    const usernameInput = ref('');
    const doesRoomExists = ref(false);
    const isLoggedIn = ref(false);
    const isLoaded = ref(false);
    const userInfo = ref();
    const userInRoom = ref<any[]>([]);

    const route = useRoute();
    const router = useRouter();
    const pageId = route.params.id;

    // Life cycle

    onBeforeMount(async () => {
        const roomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check/${pageId}`);
        const roomExists = await (await roomExistsRequest.json()).exist;
        
        const cookieData = JSON.parse(getCookie('poker-planning') || '{}');

        if (roomExists && cookieData.roomId === pageId) {
            if (!state.connected) connectToRoom(cookieData)
            else userInRoom.value.push({
                    userId: cookieData.userId,
                    username: cookieData.username
                }
            );

            userInfo.value = cookieData;
            isLoggedIn.value = true; 
        }

        doesRoomExists.value = roomExists;
        isLoaded.value = true;
    })


    // Methods

    const handleJoinRoom = () => {
        const myuuid = uuidv4();

        const user = {
            roomId: pageId,
            userId: myuuid,
            username: usernameInput.value,
        }

        userInfo.value = user;
        
        addCookie('poker-planning', JSON.stringify(user))
        connectToRoom((user as ConnectRoom));

        isLoggedIn.value = true;
    };

    const connectToRoom = async (data: ConnectRoom) => {
        socket.connect();
        socket.emit('join-room', data);

        getUserList();
    }

    const getUserList = async () => {
        const listUserRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/user-list/${pageId}`);
        const listUser = (await listUserRequest.json()).list;

        const data = [
            {
                userId: userInfo.value.userId,
                username: userInfo.value.username
            }, 
            ...listUser
        ];

        userInRoom.value.push(...new Map(data.map((v: any) => [v.userId, v])).values());

        console.log(...data);
    }

    // Sockets Events
    socket.on(`update-userList`, ( data ) => {
        console.log('data : ', data);
        userInRoom.value = [...new Map(data.map((v: any) => [v.userId, v])).values()]
    })







    const handlePostMessage = (): void => {
        if (messageInput.value.length > 0) {
            const messageContent = {
                roomId: pageId, 
                userId: userInfo.value.userId as string, 
                username: userInfo.value.username as string,
                message: messageInput.value
            };

            emitSocket('chat-message', messageContent);
            
            messageElts.value.push(messageContent);
            messageInput.value = '';
        }
    }

    socket.on(`${(pageId as string)}-message`, ( data: SocketDataReceived ) => {
        console.log('data received : ', data);
        messageElts.value.push(data);
    })

   

</script>