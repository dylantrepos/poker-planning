<template>
  <h5>List users : </h5>
  <ul v-if="state.userList">
      <li 
        v-for="user in state.userList" v-bind:key="user.userId">
          {{ user.username ?? 'error' }} : 
          <i>{{ user.userId ?? 'error' }} ({{  user.role }} {{ user.userId === state.leadId ?  '👑' : ''}})</i> | Vote {{ state.votes[user.userId] ?? '' }}
          <button 
            v-if="user.userId !== state.leadId && state.userId === state.leadId"
            @click="handleChangeLead(user.userId)"
          >
            Set leader
          </button>
      </li>
  </ul>

</template>

<script setup lang="ts">
  import { state } from '@/utils/state';
import { emitLead } from '../../sockets/emitsFunctions';

  const handleChangeLead = (leadId: string) => {
    emitLead(leadId);
  }
</script>