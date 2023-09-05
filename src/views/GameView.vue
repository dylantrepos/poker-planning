<template>
    <main>
        <div>
            Game view
        </div>
        <div v-if="!isLoaded">Loading...</div>
        <div v-else>
            <div v-if="isLoggedIn">
                <h3>Name : {{ userInfo.username}}</h3>
    
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
                <h3>{{ doesRoomExistsText }}</h3>
                <join-room @join-room="handleJoinRoom" :room-id="{pageId}"></join-room>
            </div>
        </div>

    </main>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import { io } from 'socket.io-client';
    import { getCookie } from "@/utils/utils";
    import JoinRoom from "@/components/JoinRoom.vue";
    import { gameRoomList } from "../store/data";

    // Types

    type SocketDataReceived = {
        username: string;
        message: string;
    }


    // Variables

    const messageElts = ref<SocketDataReceived[]>([]);
    const messageInput = ref('');
    const doesRoomExists = ref(false);
    const doesRoomExistsText = ref('');
    const isLoggedIn = ref(false);
    const isLoaded = ref(false);
    const userInfo = ref();

    const router = useRoute();
    const pageId = router.params.id;
    const socket = io(import.meta.env.VITE_SERVER_ADDRESS);
    

    // Methods

    const handleJoinRoom = () => {
        const cookieData = getCookie('poker-planning');
        const cookieDataParsed = cookieData ? JSON.parse(cookieData) : null;
        
        if (cookieDataParsed && cookieDataParsed?.gameId === pageId) {
            userInfo.value = cookieDataParsed;
            isLoggedIn.value = true;
        } else {
            console.log('exits ? ', gameRoomList);
        }
    }


    // Life cycle

    onMounted(async () => {
        const doesRoomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check/${pageId}`)
        const doesRoomExistsData = await doesRoomExistsRequest.json();
        doesRoomExists.value = doesRoomExistsData.exist;
        isLoaded.value = true;

        if (doesRoomExistsData.exist) {
            handleJoinRoom();
            doesRoomExistsText.value = 'Join the room';
            
            socket.emit('join game', {
                gameId: pageId
            });
        } else {
            doesRoomExistsText.value = 'Create a room';
        }
    })


    // Sockets Events

    const handlePostMessage = (): void => {
        if (messageInput.value.length > 0) {
            socket.emit('chat message',{
                gameId: pageId, 
                userId: userInfo.value.userId, 
                username: userInfo.value.username,
                message: messageInput.value
            });
            messageInput.value = '';
        }
    }

    socket.on((pageId as string), ( data: SocketDataReceived ) => {
        messageElts.value.push({ username: data.username, message: data.message});
    })

</script>