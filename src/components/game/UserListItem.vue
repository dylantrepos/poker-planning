<template>
  <h5>
    List users :
  </h5>
  <ul v-if="roomStore.userList">
    <li 
      v-for="user in roomStore.userList"
      v-bind:key="user.userId">
      <b
        :style="{
          'color': user.connected ? 'green' : 'red',
        }"
      > 
        {{ user.userName ?? 'error' }} 
      </b>: 
      <i>{{ user.userId ?? 'error' }} 
        ({{  user.userId === roomStore.leadId ?  'lead' : 'user' }}
      </i> 
      | {{ 
        roomStore.isVoteClosed 
          ? `Vote : ${roomStore.votes[user.userId]?.length > 0 ?? false 
            ? roomStore.votes[user.userId] : 'No vote'}`  
          :  (roomStore.votes[user.userId] 
            ? 'Voted !' : 'Waiting for vote...') }}
      <button 
        v-if="user.userId !== roomStore.leadId && userStore.userId === roomStore.leadId"
        @click="handleChangeLead(user.userId)"
      >
        Set leader
      </button>
    </li>
  </ul>

</template>

<script setup lang="ts">
   import { emitLead } from '../../sockets/emitsFunctions';
  
   import type { LeadId } from '@/types/GenericType';
   import useRoomStore from '@/store/useRoomStore';
   import useUserStore from '@/store/useUserStore';

   const roomStore = useRoomStore();
   const userStore = useUserStore();

   const handleChangeLead = (leadId: LeadId) => {
      emitLead(leadId);
   };
</script>