<template>
  <div class="container table-container">
    <div class="table-player">
      <div class="table-cards">
        <div 
          class="table__player-container"
          :class="`c-${i}`"
          v-for="i in 16"
          v-bind:key="i"
        >
          
          <div class="user-info">
            <p>
              {{ userList[order[i-1]-1]?.userId === state.leadId ?  '👑' : '' }}
            </p>
            <p>
              <!-- {{ userToRemove[order[i-1]-1] }} -->
              <!-- {{ userList[order[i-1]-1]?.userName }} -->
            </p>
          </div>
          <div 
            class="card-item"
            :class="{ '-played': i === posPlayer }"
          >{{ order[i-1] }}</div>
        </div>
        <div 
          class="table__table-container"
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

  .table-player {
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
  
  .table-cards {
    background-color: green;
    width: 55%;
    height: 80%;
    border-radius: 1000px;
    // outline: 5px solid #74461f;
    display: grid;

    grid-template: 
        'c1  c2  c3'
        'c4  t   c5'
        'c6  t   c7'
        'c8  t   c9'
        'c10 t   c11'
        'c12 t   c13'
        'c14 c15 c16'
    ;
    
    @media (min-width: $m) {
      width: 80%;
      height: 65%;
      gap: 2px;

      grid-template: 
          'c1  c2  c3  c4  c5  c6  c7'
          'c8  t   t   t   t   t   c9' 1fr
          'c10 c11 c12 c13 c14 c15 c16'
      ;
    
    }
  }

  .table__player-container {
    border: 1px solid yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:nth-child(1) {
      justify-content: end;
      align-items: end;
    }

    &:nth-child(3) {
      justify-content: start;
      align-items: end;
    }

    &:nth-child(14) {
      justify-content: end;
      align-items: start;
    }

    &:nth-child(16) {
      justify-content: start;
      align-items: start;
    }
    
    @media (min-width: $m) {
      &:nth-child(3) {
        justify-content: center;
        align-items: center;
      }

      &:nth-child(7) {
        justify-content: start;
        align-items: end;
      }
  
      &:nth-child(10) {
        justify-content: end;
        align-items: start;
      }

      &:nth-child(14) {
        justify-content: center;
        align-items: center;
      }
    } 
  }

  @for $i from 1 through 17 {
    .c-#{$i} {
      grid-area: c#{$i};

      @if $i > 3 and $i < 14 {
        width: 12dvw;

        .user-info {
          left: -5.5rem;
        }
        
        @if $i % 2 != 0 {
          justify-self: end;
          .user-info {
            left: unset;
            right: -5.5rem;
          }
        }
      }

      @if $i == 1 {
        padding-bottom: 0;
        padding-right: 1.5dvw;

        .user-info {
          top: 0;
          left: -3rem;
        }
      }

      @if $i == 2 {
        .user-info {
          top: -2.5rem;
        }
      }
      
      @if $i == 3 {
        padding-bottom: 0;
        padding-left: 1.5dvw;

        .user-info {
          top: 0;
          right: -3rem;
        }
      }
      
      @if $i == 14 {
        padding-top: 0;
        padding-right: 1.5dvw;

        .user-info {
          bottom: 0;
          left: -3rem;
        }
      }
      
      @if $i == 16 {
        padding-left: 1.5dvw;
        padding-top: 0;

        .user-info {
          bottom: 0;
          right: -3rem;
        }
      }

      @if $i == 15 {
        .user-info {
          bottom: -2.5rem;
        }
      }
    }

    @media (min-width: $m) {
      .c-#{$i} {
        justify-self: auto;
        width: auto;
        padding: 0;

        @if $i > 1 and $i < 7 or $i > 10 and $i < 16 {
          height: 7dvw;
          max-height: 6.5rem;

          .user-info {
            top: -3rem;
            left: unset;
            right: unset;
          }

          @if $i > 10 {
            .user-info {
              bottom: -3rem;
              top: unset;
              left: unset;
              right: unset;
            }
          }
        }

        @if $i == 1 or $i == 7 or $i == 10 or $i == 16 {
          height: 9dvw;
          max-height: 8.5rem;
        }

        @if $i == 8 or $i == 9 {
          min-height: 5dvh;
        }

        @if $i == 2 or $i == 6  {
          align-items: end;
        }

        @if $i == 11 or $i == 15 {
          align-items: start;
        }
        
        @if $i > 10 and $i < 16 {
          align-self: end;
        }

        @if $i == 1 {
          padding-right: 0;
          padding-left: 1rem;
        }


        @if $i == 2 {
          padding-bottom: 0.5rem;
          padding-left: 1rem;
        }

        @if $i == 6 {
          padding-bottom: 0.5rem;
          padding-right: 1rem;
        }

        @if $i == 7 {
          .user-info {
            top: 0;
            right: -1rem;
          }
        }

        @if $i == 8 {
          .user-info {
            left: -4rem;
          }
        }

        @if $i == 9 {
          .user-info {
            right: -8rem;
          }
        }

        @if $i == 10 {
          .user-info {
            bottom: 0;
            left: -1rem;
          }
        }

        @if $i == 11 {
          padding-top: 0.5rem;
          padding-left: 1rem;
        }

        @if $i == 15 {
          padding-top: 0.5rem;
          padding-right: 1rem;
        }

        @media (max-height: $m) {
          @if $i > 1 and $i < 7 or $i > 10 and $i < 16 {
            height: 12dvh;
            max-height: 6.5rem;
          }

          @if $i == 1 or $i == 7 or $i == 10 or $i == 16 {
            height: 12dvh;
            max-height: 8.5rem;
          }

          @if $i == 2 {
            padding-bottom: 0.2rem;
            padding-left: 0;
          }
          
          @if $i == 6 {
            padding-bottom: 0.2rem;
            padding-right: 0;
          }

          @if $i == 11 {
            padding-top: 0.2rem;
            padding-left: 0;
          }
  
          @if $i == 15 {
            padding-top: 0.2rem;
            padding-right: 0;
          }
        }


        @if $i == 16 {
          padding-left: 0;
          padding-right: 1rem;
        }
      }
    }
  }
  
  .card-item {
    width: 4dvw;
    max-width: 25px;
    aspect-ratio: 2/3;
    border: 1px solid white;
    border-radius: 2px;
    
    @media (min-width: $xxs) {
      width: 5dvw;
    }
    
    @media (min-width: $m) {
      width: 2.5dvw;
      max-width: none;
    }

    &.-played {
      background-color: black;
    }
  }
  
  .table__table-container {
    border: 1px solid orange;
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    grid-area: t;
  }

  .user-info {
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