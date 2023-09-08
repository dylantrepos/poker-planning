<template>
  <h5>List users : </h5>
  <ul>
      <li v-for="user in usersInRoom" v-bind:key="user.userId">
          {{ user.username ?? 'error' }} : 
          <i>{{ user.userId ?? 'error' }} ({{  user.role }} {{ user?.role === 'lead' ?  '👑' : ''}})</i>
      </li>
  </ul>

</template>

<script setup lang="ts">
  import type { UserList } from '@/types/UserType';
  import { getUserList } from '@/utils/room';
  import { onMounted, ref, watch } from 'vue';
  import { state } from '@/sockets/sockets';
import { updateUserList } from '../../sockets/onFunctions';

  const usersInRoom = ref<UserList>([])
 
  watch(
      () => state.rooms[state.roomId]?.userList,
      () => { 
        usersInRoom.value = state.rooms[state.roomId].userList
      }
    )
  
  onMounted(async () => {
    const userList: UserList = await getUserList(state.roomId as string);
    
    console.log('user list : ', userList);
    state.rooms[state.roomId] = {
      userList,
      messages: []
    }
    
    usersInRoom.value.push(...userList)
  })

</script>