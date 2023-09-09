<template>
  <h5>List users : </h5>
  <ul v-if="state.rooms[state.roomId]">
      <li 
        v-for="user in state.rooms[state.roomId]?.userList" v-bind:key="user.userId">
          {{ user.username ?? 'error' }} : 
          <i>{{ user.userId ?? 'error' }} ({{  user.role }} {{ user?.role === 'lead' ?  '👑' : ''}})</i> | Vote {{ user.vote ?? 'null' }}
      </li>
  </ul>

</template>

<script setup lang="ts">
  import type { UserList } from '@/types/UserType';
  import { getUserList } from '@/utils/room';
  import { onMounted } from 'vue';
  import { state } from '@/sockets/sockets';
  
  onMounted(async () => {
    const userList: UserList = await getUserList(state.roomId as string);
    state.rooms[state.roomId] = {
      userList,
      messages: []
    }
  })

</script>