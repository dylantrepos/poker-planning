<template>
  <a 
    class="home-view_author"
    href="https://github.com/dylantrepos"
    target="_blank"
    :class="{
      '-hovered': true,
    }"
  >
    <Github 
      :size="5"
      class="home-view_author-icon" 
    />
    <p
      class="home-view_author-name" 
        
    >
      @dylantrepos
    </p>
  </a>
</template>

<script setup lang="ts">
   import { Github } from 'lucide-vue-next';
</script>

<style lang="scss">
  @import '../../assets/variables'; 
  
  .home-view_author {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 1.5rem;
    height: 4rem;
    width: auto;
    text-decoration: none;
    
    @media (min-width: $m) {
      gap: 0.5rem;
      flex-direction: column;
      position: absolute;
      bottom: 2.5rem;
      height: 2rem;
      width: 10rem;

      &:hover {
        .home-view_author-icon {
          bottom: 50%;
          transform: translate(-50%, 50%) rotate3d(1, 0, 0, 0deg);
          pointer-events: all;
        }
        
        .home-view_author-name {
          top: -1.5rem;
          transform: translate(-50%, -50%) rotate3d(1, 0, 0, 90deg);
        }
      }
    }
  }

  .home-view_author-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 100px;
    padding: 0.4rem;
    stroke-width: 1px;
    
    @media (min-width: $xs) {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.6rem;
    }

    @media (min-width: $m) {
      position: absolute;
      left: 50%;
      width: 3rem;
      height: 3rem;
      border: 1px solid white;
      border-radius: 100px;
      padding: 0.6rem;
      transition: all .5s ease-in-out;
      left: 50%;
      bottom: -3rem;
      transform: translateX(-50%) rotate3d(1, 0, 0, 90deg);
      pointer-events: none;
      stroke-width: 1.5px;
    }
  }

  .home-view_author-name {
    height: auto;
    text-decoration: none;
    font-size: .8rem;
    
    @media (min-width: $xs) {
      font-size: 1rem;
    }
    
    @media (min-width: $m) {
      font-size: 1rem;
      position: absolute;
      
      transition: all .5s ease-in-out;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;

      
    }
  }
</style>