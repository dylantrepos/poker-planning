<template>
  <div class="header__container">
    <div 
      class="header__title"
      @click="redirectToHome"
    >
      Poker planning
    </div>
  </div>
</template>

<script setup lang="ts">
   import { useRouter } from "vue-router";


   const router = useRouter();

   // Methods 
   const redirectToHome = (): void => {
      router.push('/');
   };
</script>

<style scoped>
.header__container {
  height: 50px;
}

.header__title {
  color: red;
}
</style>