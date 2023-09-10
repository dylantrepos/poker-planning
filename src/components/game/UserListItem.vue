<template>
  <h5>List users : </h5>
  <ul v-if="state.rooms[state.roomId]">
      <li 
        v-for="user in state.rooms[state.roomId]?.userList" v-bind:key="user.userId">
          {{ user.username ?? 'error' }} : 
          <i>{{ user.userId ?? 'error' }} ({{  user.role }} {{ user?.role === 'lead' ?  '👑' : ''}})</i> | Vote {{ state.rooms[state.roomId].votes.find(u => u.userId === user.userId)?.vote ?? 'null' }}
      </li>
  </ul>

</template>

<script setup lang="ts">
  import { state } from '@/sockets/sockets';
  import { ref, watch } from 'vue';

  const vote = ref('');

  watch(
    () => state.rooms[state.roomId]?.votes,
    () => {
      const userVotefound = state.rooms[state.roomId].votes.find(user => user.userId === state.userId);
      vote.value = userVotefound?.vote ?? '';
    }
  )
</script>