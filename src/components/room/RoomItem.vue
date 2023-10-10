<template>
  <main>
    <HeaderItem />
    <BannerItem />
    <TableItem ref="tableItem" />
  </main>
</template>

<script setup lang="ts">
  
   import TableItem from "@/components/game/TableItem.vue";
   import HeaderItem from "@/components/general/HeaderItem.vue";
   import BannerItem from "@/components/general/BannerItem.vue";
   
</script>

