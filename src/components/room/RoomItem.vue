<template>
  <main>
    <HeaderItem />
    <BannerItem />
    <VotesResultItem v-if="roomStore.isVoteClosed" />
    <TableItem ref="tableItem" />
  </main>
</template>

<script setup lang="ts">
  
   import VotesResultItem from "@/components/game/VotesResultItem.vue";
   import TableItem from "@/components/game/TableItem.vue";
   import HeaderItem from "@/components/general/HeaderItem.vue";
   import useRoomStore from "@/store/useRoomStore";
   import BannerItem from "@/components/general/BannerItem.vue";

   const roomStore = useRoomStore();
</script>

