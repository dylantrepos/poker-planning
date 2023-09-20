<template>
  <main class="not-found__container">
    <h1 class="not-found__title">
      Oups !
    </h1>
    <p class="not-found__text">
      This page doesn't exist. <br>
      Go to homepage to create a game.
    </p>
    <button 
      class="button"
      @click="handleRedirectToHome"
    >
      Go to home
    </button>
  </main>
</template>

<script setup lang="ts">
   import { useRouter } from "vue-router";

   const router = useRouter();
     
   // Methods
   const handleRedirectToHome = async () => {
      router.push('/');
   };
</script>


<style lang="scss">
  .not-found__container {
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 100dvh;
    justify-content: center;
  }

  .not-found__title {
    font-weight: 500;
  }

  .not-found__text {
    margin: 2rem;
    text-align: center;
  }
</style>