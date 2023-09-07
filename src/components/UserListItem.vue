<template>
  <div>
  <h5>List users : </h5>
</div>
  <ul>
      <li v-for="user in usersInRoom" v-bind:key="user.userId">
          {{ user.username ?? 'error' }} : <i>{{ user.userId ?? 'error' }}</i>
      </li>
  </ul>

</template>

<script setup lang="ts">
import type { UsersInRoom } from '../types/UserType';
import { getUserList } from '../utils/room';
import { onMounted, ref, watch } from 'vue';
import { state } from '@/sockets/sockets';

  type Props = {
    roomId: string,
  }

  const props = defineProps<Props>();
  const usersInRoom = ref<UsersInRoom>([])

  watch(
      () => state.rooms,
      () => usersInRoom.value = state.rooms
    )
  
  onMounted(async () => {
    const userList: UsersInRoom = await getUserList(props.roomId as string);
    console.log('room id : ', userList);
    usersInRoom.value.push(...userList)
  })

</script>