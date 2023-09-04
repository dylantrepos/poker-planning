<template>
    <main>
        <div>
            Game view
        </div>
        <input type="text" v-model="messageInput">
        <button @click="handleTestSocket">
            Test socket
        </button>
        <div 
            style="margin-top: 5px; padding-top: 5px; border-top: 1px solid red;"
             v-for="msg in messageElts" 
             v-bind:key="msg"
        >
            {{ msg }}
        </div>
    </main>
</template>

<script setup lang="ts">
    // import { useRoute } from "vue-router";
    import { io } from 'socket.io-client';
    import { ref } from "vue";

    const messageElts = ref(['test']);
    const messageInput = ref('test');


    // const router = useRoute();
    // const pageId = router.params.id;

    const socket = io('http://localhost:3000', {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    });

    const handleTestSocket = (): void => {
        socket.emit('chat message', messageInput.value);
    }

    socket.on('chat message', ( msg: string ) => {
        messageElts.value = [...messageElts.value, msg];
    })

</script>