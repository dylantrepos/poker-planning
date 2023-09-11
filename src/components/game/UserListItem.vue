<template>
  <h5>List users : </h5>
  <ul v-if="state.userList">
      <li 
        v-for="user in state.userList" v-bind:key="user.userId">
          {{ user.username ?? 'error' }} : 
          <i>{{ user.userId ?? 'error' }} 
            ({{  user.userId === state.leadId ?  'lead' : 'user' }}
            {{ user.userId === state.leadId ?  '👑' : ''}})
          </i> 
            | {{ state.voteClose ? `Vote : ${state.votes[user.userId] ?? 'No vote'}`  :  (state.votes[user.userId] ? 'Voted !' : 'Waiting for vote...') }}
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