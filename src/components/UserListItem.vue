<template>
  <h5>List users : </h5>
  <ul>
      <li v-for="user in usersInRoom" v-bind:key="user.userId">
          {{ user.username ?? 'error' }} : <i>{{ user.userId ?? 'error' }}</i>
      </li>
  </ul>

</template>

<script setup lang="ts">
import type { UserList } from '../types/UserType';
import { getUserList } from '../utils/room';
import { onMounted, ref, watch } from 'vue';
import { state } from '@/sockets/sockets';

  type Props = {
    roomId: string,
  }

  const props = defineProps<Props>();
  const usersInRoom = ref<UserList>([])
 
  watch(
      () => state.rooms[props.roomId]?.userList,
      () => { 
        console.log('room : ', state.rooms);
        usersInRoom.value = state.rooms[props.roomId].userList
      }
    )
  
  onMounted(async () => {
    const userList: UserList = await getUserList(props.roomId as string);
    console.log('userlist first : ', userList);
    state.rooms[props.roomId] = {
      userList,
      messages: []
    }
    usersInRoom.value.push(...userList)
  })

</script>