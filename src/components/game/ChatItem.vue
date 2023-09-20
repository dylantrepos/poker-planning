<template>
  <div 
    style="margin-top: 5px; padding-top: 5px; border-top: 1px solid red;"
    v-for="msg in state.messages" 
    v-bind:key="msg.userName"
  >
    <b 
      style="color: blue;"
      :style="{
        'color': msg.userId === state.userId ? 'red' : 'blue'
      }"
    >
      {{ msg.userName }}:
    </b> 
    {{ msg.message }}
  </div>
</template>

<script setup lang="ts">
   import { state } from '@/utils/state';
</script>