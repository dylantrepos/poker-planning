<template>
  <div 
    class="room-banner__info-text"
  >
    <transition 
      name="slide-fade" 
      mode="out-in"
    >
      <p :key="generalStore.bannerMessage">
        {{ generalStore.bannerMessage }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
   import useGeneralStore from '@/store/useGeneralStore';

   const generalStore = useGeneralStore();
</script>


<style lang="scss">
  @import '../../assets/variables'; 

  .room-banner__info-text {
    // height: 4rem;
    padding: 1rem;
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.473) 50%, rgba(0,0,0,0) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--banner-height);
    max-height: var(--banner-height);
    margin-top: var(--header-height);
    margin-bottom: 1rem;
    width: 100%;
    text-align: center;

    @media (min-width: $m) {
      margin-bottom: 0;
    }
  }
  
  .room-banner__buttons-container {
    width: 100%;
    height: 15dvh;
    min-height: 6rem;
    max-height: 8rem;
    padding: 5%;
    background-color: black;
    position: fixed;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    gap: 1rem;

    @media (min-width: $m) {
      width: 15dvw;
      right: 2.5dvw;
      top: calc(50% + 5rem);
      transform: translateY(-50%);
      flex-direction: column;
      height: 450px;
      padding: 2rem;
      max-height: unset;
      max-width: unset;
      background-color: yellow;
    }
  }

  .slide-fade-enter-active {
    transition: all .2s ease-in;
  }

  .slide-fade-leave-active {
    transition: all .2s ease-out;
  }

  .slide-fade-enter-from {
    transform: translateY(20px);
    opacity: 0;
  }

  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>