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
                     <b 
                        style="color: blue;"
                        :style="{
                            'color': msg.userId === userInfo.userId ? 'red' : 'blue'
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
    import { onBeforeMount, ref } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { socket } from "@/sockets/sockets";
    import { addCookie, getCookie } from "@/utils/utils";
    import { v4 as uuidv4 } from 'uuid';
    import type { UserMessage } from '@/types/UserType';

    // Variables

    const messageElts = ref<UserMessage[]>([]);
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
            connectToRoom()

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
        
        addCookie('poker-planning', JSON.stringify(user));

        connectToRoom();

        isLoggedIn.value = true;
    };

    const connectToRoom = async () => {
        socket.connect();

        socket.on('connect', async () => {
            socket.emit('join-room', userInfo.value);
    
            console.log('socket : ', socket.connected);
    
            const getConvRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/conv/${pageId}`);
            const getConv = (await getConvRequest.json()).conv.map((e: any) => JSON.parse(e)); 
            const convOrdered = [...getConv].sort((a, b) => a.order > b.order ? 1 : -1);
    
            messageElts.value = convOrdered;
        })

        getUserList();
    }

    const getUserList = async () => {
        const listUserRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/user-list/${pageId}`);
        const listUser = (await listUserRequest.json()).list;

        const data = new Map([
            {
                userId: userInfo.value.userId,
                username: userInfo.value.username
            }, 
            ...listUser
        ].map((v: any) => [v.userId, v])).values();

        userInRoom.value.push(...data);
    }

    const handlePostMessage = (): void => {
        if (messageInput.value.length === 0) return;
        
        socket.emit('chat-message', {
            roomId: pageId, 
            userId: userInfo.value.userId as string, 
            username: userInfo.value.username as string,
            message: messageInput.value
        });

        messageInput.value = '';
    }


    // Sockets Events

    socket.on(`update-userList`, ( data ) => {
        userInRoom.value = [...new Map(data.map((v: any) => [v.userId, v])).values()]
    })

    socket.on(`message`, ( message: UserMessage ) => {
        messageElts.value.push(message);
    })

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

   

</script>