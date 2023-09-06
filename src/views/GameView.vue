<template>
    <main>
        <div>
            Game view
        </div>
        <div v-if="!isLoaded">Loading...</div>
        <div v-else>
            <div v-if="isLoggedIn">
                <h3>Name : {{ userInfo.username }}</h3>
    
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
                    <button @click="handleCreateRoom">Create a room</button>
                </div>
            </div>
        </div>

    </main>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { emitSocket, socket, state } from "@/sockets/sockets";
import { addCookie, getCookie } from "@/utils/utils";

    // Types

    type SocketDataReceived = {
        username: string;
        message: string;
    }

    type ConnectRoom = {
        gameId: string;
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

    const route = useRoute();
    const router = useRouter();
    const pageId = route.params.id;

    // Life cycle

    onMounted(async () => {
        const roomExistsRequest = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/check/${pageId}`);
        const roomExists = await (await roomExistsRequest.json()).exist;
        const cookieData = JSON.parse(getCookie('poker-planning') || '{}');

        if (roomExists) {
            if (cookieData.gameId === pageId) {
                if (! state.connected) connectToRoom(cookieData)
                isLoggedIn.value = true; 
                userInfo.value = cookieData;
            } 
        }

        doesRoomExists.value = roomExists;
        isLoaded.value = true;
    })


    // Methods

    const handleJoinRoom = () => {
        userInfo.value = {
            gameId: pageId,
            username: usernameInput.value,
        }
        
        addCookie('poker-planning', JSON.stringify(userInfo.value))
        connectToRoom(userInfo.value);

        isLoggedIn.value = true;

    };

    const connectToRoom = (data: ConnectRoom) => {
        socket.connect();
        socket.emit('join-room', data);
    }

    const handleCreateRoom = () => router.push('/');



    // Sockets Events

    const handlePostMessage = (): void => {
        if (messageInput.value.length > 0) {
            const messageContent = {
                gameId: pageId, 
                userId: userInfo.value.userId as string, 
                username: userInfo.value.username as string,
                message: messageInput.value
            };

            emitSocket('chat-message', messageContent);

            messageInput.value = '';
        }
    }

    socket.on((pageId as string), ( data: SocketDataReceived ) => {
        messageElts.value.push({ username: data.username, message: data.message});
    })

    socket.on(`${pageId}-userList`, ( data ) => {
        console.log('data : ', data);
    })

</script>