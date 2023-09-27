<template>
  <div class="container table-container">
    <div class="table__players-container">
      <div class="table__cards-container">
        <div 
          class="table__player-item"
          :class="`c-${i}`"
          v-for="i in order"
          v-bind:key="i"
        >
          
          <div class="table__player-info">
            <p>
              <!-- {{ userList[order[i-1]-1]?.userId === state.leadId ?  '👑' : '' }} -->
            </p>
            <p>
              <!-- {{ userToRemove[order[i-1]-1] }} -->
              <!-- {{ userList[order[i-1]-1]?.userName }} -->
            </p>
          </div>
          <div 
            class="table__card-item"
            :class="{ '-played': i === posPlayer }"
          >{{ i }}</div>
        </div>
        <div 
          class="table__table-info-container"
        >
          <div>
            table
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
   import type { User } from '@/types/UserType';
   import { state } from '@/utils/state';
   import { onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';

   watch(
      () => state.userList,
      () => {
         userList.value = Object.values(state.userList).sort();
      }
   );

   const getSizeWindow = () => {
      order.value = window.innerWidth >= 767 
         ? [13, 5, 9, 2, 10, 6, 14, 3, 4, 15, 7, 11, 1, 12, 8, 16]
         : [13, 2, 14, 5, 7, 9, 11, 3, 4, 10, 12, 6, 8, 15, 1, 16];
      
      posPlayer.value = window.innerWidth >= 768 ? 13 : 15;

      console.log('window.screen.width : ',window.innerWidth);
   }; 

   //  console.log('state : ', state.userList);
   //  console.log('state fnd : ', Object.values(state.userList));
   
   const order = ref<number[]>([]);
   //  const userToRemove = ref([
   //     'jean', 'paul', 'robert', 'michael', 'johnny', 'Bennjy', 
   //     'jean michel', 'Raoul', 'Tom', 'Ezikakfezfzezffsdfdsfakame', 'Albert',
   //     'David', 'Kevin', 'Dylan', 'Lilian', 'jordan']);
   const posPlayer = ref(0);
   const userList = ref<User[]>([]);
   
   onBeforeMount(() => {
      window.addEventListener('resize', () => getSizeWindow());
      console.log('user : ', state.userList);
      getSizeWindow();
   });
    
   onBeforeUnmount(() => {
      window.removeEventListener('resize', () => getSizeWindow());
   });


</script>

<style lang="scss">
  @import '../../assets/variables'; 

  .table-container {
    height: calc(100dvh - var(--header-height));
  }

  .table__players-container {
    background-color: red;

    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100dvw;
    height: 110dvw;
    min-width: 350px;
    min-height: 450px;
    max-width: 550px;
    margin-bottom: 5dvh;
    aspect-ratio: 2.1 / 3;
    
    @media (min-width: $xxs) {
      height: 130dvw;
      max-height: 600px;
    }
    
    @media (min-width: $m) {
      width: 65dvw;
      height: auto;
      aspect-ratio: 13/9;
      max-width: 1100px;
      max-height: auto;
    }
  }
  
  .table__cards-container {
    background-color: green;
    width: 55%;
    height: 80%;
    border-radius: 1000px;
    // outline: 5px solid #74461f;
    display: grid;

    grid-template: 
        'c13 c2 c14'
        'c5  t  c7'
        'c9  t  c11'
        'c3  t  c4'
        'c10 t  c12'
        'c6  t  c8'
        'c15 c1 c16'
    ;
    
    @media (min-width: $m) {
      width: 80%;
      height: 65%;
      gap: 2px;

      grid-template: 
          'c13 c5 c9  c2 c10 c6 c14'
          'c3  t  t   t  t   t  c4' 1fr
          'c15 c7 c11 c1 c12 c8 c16'
      ;
    
    }
  }

  .table__player-item {
    border: 1px solid yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

  }

  @for $i from 1 through 17 {
    .c-#{$i} {
      grid-area: c#{$i};

      
    }
  }
  
  .table__card-item {
    width: 4dvw;
    max-width: 25px;
    aspect-ratio: 2/3;
    border: 1px solid white;
    border-radius: 2px;

    &.-played {
      background-color: black;
    }
  }
  
  .table__table-info-container {
    border: 1px solid orange;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    grid-area: t;
  }

  .table__player-info {
    display: flex;
    flex-direction: column;
    position: absolute;
    text-align: center;
    width: 20dvw;
    max-height: 3rem;
    background-color: purple;
    
    > p {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: break-spaces;
      -webkit-line-clamp: 2;
      word-wrap: break-word;
      -webkit-box-orient: vertical;
    }

    @media (min-width: $m) {
      width: 5dvw;
    }
  }
</style>  