<template>
  <h5>List users : </h5>
  <ul v-if="state.userList">
      <li 
        v-for="user in state.userList" v-bind:key="user.userId">
          {{ user.username ?? 'error' }} : 
          <i>{{ user.userId ?? 'error' }} ({{  user.role }} {{ user.role === 'lead' ?  '👑' : ''}})</i> | Vote {{ state.votes[user.userId] ?? '' }}
      </li>
  </ul>

</template>

<script setup lang="ts">
import { state } from '@/utils/state';


</script>