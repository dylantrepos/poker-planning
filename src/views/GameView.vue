<template>
    <main>
        <div>
            Game view
        </div>
        <input type="text" v-model="messageInput">
        <input type="text" v-model="nameInput">
        <button @click="handleTestSocket">
            Test socket
        </button>
        <div 
            style="margin-top: 5px; padding-top: 5px; border-top: 1px solid red;"
             v-for="msg in messageElts" 
             v-bind:key="msg.name"
        >
          <b style="color: blue;">{{ msg.name }} :</b> {{ msg.message }}
        </div>
    </main>
</template>

<script setup lang="ts">
    import { useRoute } from "vue-router";
    import { io } from 'socket.io-client';
    import { ref } from "vue";

    const messageElts = ref([{ name: 'test', message: 'test' }]);
    const messageInput = ref('test');
    const nameInput = ref('Toto');

    const router = useRoute();
    const pageId = router.params.id;
    // const pageId = 'e4b31a6f-3352-48b6-ac57-dba7135aba2c'

    const socket = io('http://localhost:3000');
    
    socket.emit('join game', {
        gameId: pageId
    });

    const handleTestSocket = (): void => {
        socket.emit('chat message',{
        gameId: pageId, 
        name: nameInput.value,
        message: messageInput.value
    });
    }

    socket.on(pageId, ( data: Object ) => {
        messageElts.value = [
            ...messageElts.value, 
            { name: data.name, message: data.message}];
    })

</script>