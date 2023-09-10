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
  import { state } from '@/sockets/sockets';

</script>