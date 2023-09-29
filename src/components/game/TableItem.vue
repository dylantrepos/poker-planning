<template>
  <div 
    class="table"
    :class="{
      '-large': tableLargerThanScreen
    }"
  >
    <div 
      class="table__container"
      ref="tableDivElt"
    >
      <div 
        class="table__top"
      >
        <PlayerItemVue
          v-for="user in (state.userListOrdered[screenSize][0])"
          v-bind:key="user.userId"
          :user="{ ...user }"
          :additionnal-classes="{ 
            'three': state.userListOrdered[screenSize][0].length === 3 && !screenSizeLarge,
          }"
          place="-top"
        />
      </div>
      <div 
        class="table__left"
        ref="leftDivElt"
      >
        <PlayerItemVue 
          v-for="user in state.userListOrdered[screenSize][1]"
          v-bind:key="user.userId"
          :user="{ ...user }"
          :additionnal-classes="{ 
            'three': state.userListOrdered[screenSize][1].length === 3 && screenSizeLarge,
            'large': hasHigherElt,
          }"
          place="-left"
        />
      </div>
      <div class="table__center">
        <div class="table__table-item">
        </div>
      </div>
      <div 
        class="table__right"
        ref="rightDivElt"
      >
        <PlayerItemVue 
          v-for="user in state.userListOrdered[screenSize][2]"
          v-bind:key="user.userId"
          :user="{ ...user }"
          :additionnal-classes="{ 
            'three': state.userListOrdered[screenSize][2].length === 3 && screenSizeLarge,
            'large': hasHigherElt
          }"
          place="-right"
        />
      </div>
      <div class="table__bottom">
        <PlayerItemVue 
          v-for="user in state.userListOrdered[screenSize][3]"
          v-bind:key="user.userId"
          :user="{ ...user }"
          :additionnal-classes="{ 
            'three': state.userListOrdered[screenSize][3].length === 3 && !screenSizeLarge,
          }"
          place="-bottom"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
   import { state } from '@/utils/state';
   import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
   import PlayerItemVue from '@/components/game/PlayerItem.vue';

   
   const screenSizeLarge = ref(window.innerWidth >= 767);
   const screenSize = ref<'xxs' | 'sm' | 'lg'>('sm');
   const tableLargerThanScreen = ref(false);
   const tableDivElt = ref<HTMLDivElement>();
   const leftDivElt = ref<HTMLDivElement>();
   const rightDivElt = ref<HTMLDivElement>();
   const hasHigherElt = ref(false);
   const throttlePause = ref(false);

   watch(
      () => state.userListOrdered,
      () => {
         if (leftDivElt.value && rightDivElt.value && leftDivElt.value.children.length > 1) resizeHighestSideElt();
      }
   );

   const resizeHighestSideElt = () => {
      const sideDivChildren = [...(leftDivElt.value?.children ?? []), ...rightDivElt.value?.children ?? []];
      const maxHeight = Math.max(...sideDivChildren.map((child) => child.clientHeight)); 

      if (maxHeight > 50) hasHigherElt.value = true;
   };

   // Throttle
   const throttle = (callback: Function, time: number) => {
      if (throttlePause.value) return;

      throttlePause.value = true;

      setTimeout(() => {
         callback();
         throttlePause.value = false;
      }, time);
   };

   const getSizeWindow = () => {      
      screenSizeLarge.value = window.innerWidth >= 767;

      if (window.innerWidth < 500) screenSize.value = 'xxs';
      else if (window.innerWidth < 767) screenSize.value = 'sm';
      else screenSize.value = 'lg';

      tableLargerThanScreen.value = (tableDivElt.value?.offsetWidth ?? 0) > window.innerWidth;
   }; 


   /**
    * Life cycle
    */
   
   onMounted(() => {
      window.addEventListener('resize', () => throttle(getSizeWindow, 250));
      getSizeWindow();

      setTimeout(() => {
         tableLargerThanScreen.value = (tableDivElt.value?.offsetWidth ?? 0) > window.innerWidth;
      }, 50);
   });
    
   onBeforeUnmount(() => {
      window.removeEventListener('resize', () => getSizeWindow());
   });


</script>

<style lang="scss">
  @import '../../assets/variables'; 

  .table {
    display: flex;
    justify-content: center;
    
    @media (min-width: $m) {
      width: 100vw;
      margin-top: 2rem;

      &.-large {
        justify-content: unset;
        overflow: scroll;
      }
      
    }
  }

  .table__container {
    display: grid;
    grid-template-areas:
        ".    top    .    "
        "left center  right"
        ".    bottom .    ";
    grid-template-columns: 6rem 1fr 6rem;
    grid-template-rows: auto minmax(50dvh, 1fr) auto;
    align-items: stretch;
    width: calc(100vw - 1rem);
    max-width: 30rem;
    min-width: 20rem;
    background-color: red;

    @media (min-width: $m) {
      // grid-template-columns: minmax(8rem, auto) minmax(30rem, auto) minmax(8rem, auto);
      // grid-template-columns: auto minmax(30rem, auto) auto;
      grid-template-columns: 8rem 1fr 8rem;
      grid-template-rows: auto minmax(20rem, 1fr) auto;
      max-width: unset;
      min-width: unset;
      padding: 0 2%;
      width: auto;
    }

    @media (min-width: $l) {
      padding: 0 5%;
    }

    > * {
      border: 1px solid yellow;
    }
  }


  /**
   * GRID DIRECTION
   */
  .table__top {
    grid-area: top;

    @media (min-width: $xxs) and (max-width: $m)  {

      gap: 1.5rem;

      .table__player.-three:nth-child(2), .table__player.-three:nth-child(3) {
        position: absolute;
        overflow: visible;
        bottom: 0;
      }

      .table__player.-three:nth-child(2) {
        left: -4rem;

        .table__player-card {
          right: -2rem;
        }

        @media (min-width: $xs)  {
          left: -3rem;

          .table__player-card {
            right: -2rem;
          }
        }
        
      }

      .table__player.-three:nth-child(3) {
        right: -4rem;

        .table__player-card {
          left: -2rem;
        }

        @media (min-width: $xs)  {
          right: -3rem;

          .table__player-card {
            left: -2rem;
          }
        }
      }
    }
  }

  .table__bottom {
    grid-area: bottom;

    @media (min-width: $xxs) and (max-width: $m)  {

      gap: 1.5rem;

      .table__player.-three:nth-child(2), .table__player.-three:nth-child(3) {
        position: absolute;
        overflow: visible;
        top: 0;
      }

      .table__player.-three:nth-child(2) {
        left: -4rem;

        .table__player-card {
          right: -2rem;
        }

        @media (min-width: $xs)  {
          left: -3rem;

          .table__player-card {
            right: -2rem;
          }
        }
      }

      .table__player.-three:nth-child(3) {
        right: -4rem;

        .table__player-card {
          left: -2rem;
        }

        @media (min-width: $xs)  {
          right: -3rem;

          .table__player-card {
            left: -2rem;
          }
        }
      }
    }
  }
  
  .table__left {
    grid-area: left;
  }

  .table__right {
    grid-area: right;
  }

  .table__top, .table__bottom, .table__left, .table__right {
    display: flex;
    position: relative;
    gap: 1rem;
  }

  .table__top, .table__bottom {
    justify-content: center;
    min-height: 3.5rem;

    @media (min-width: $m) {
      padding: 0 5rem;
      flex-direction: row;
    }    
    
    @media (min-width: $l) {
      gap: 2rem;
    }
  }

  .table__left, .table__right {
    flex-direction: column;
    justify-content: space-evenly;
    padding: 5rem 0;
    min-height: 14rem;

    @media (min-width: $xs) {
      padding: 5rem 0;
    }    

    @media (min-width: $m) {
      gap: 2rem;
      padding: 3rem 0;
      min-height: auto;
      flex-direction: column;
    }
  }
  
  .table__center {
    grid-area: center;
    // min-width: 16rem;
    background-color: orange;
    // border-radius: 1000px;
    border-radius: 40px;
    // min-width: 11rem;

    @media (min-width: $m)  {
      border-radius: 70px;
      min-width: 30rem;
    }
  }
</style>  