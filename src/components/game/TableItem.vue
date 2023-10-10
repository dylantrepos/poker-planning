<template>
  <div 
    class="table"
    :class="{
      '-large': tableLargerThanScreen,
      '-result': roomStore.isVoteClosed
    }"
  >
    <VotesResultItem v-if="roomStore.isVoteClosed" />
    <div 
      class="table__container"
      ref="tableDivElt"
    >
      <div 
        class="table__top"
      >
        <PlayerItemVue
          v-for="user in (roomStore.userListOrdered[screenSize][0])"
          v-bind:key="user.userId"
          :user="{ ...user }"
          :additionnal-classes="{ 
            'three': roomStore.userListOrdered[screenSize][0].length === 3 && !screenSizeLarge,
          }"
          place="-top"
        />
      </div>
      <div 
        class="table__left"
        ref="leftDivElt"
      >
        <PlayerItemVue 
          v-for="user in roomStore.userListOrdered[screenSize][1]"
          v-bind:key="user.userId"
          :user="{ ...user }"
          :additionnal-classes="{ 
            'three': roomStore.userListOrdered[screenSize][1].length === 3 && screenSizeLarge,
            'large': hasHigherElt,
          }"
          place="-left"
        />
      </div>
      <div 
        class="table__center"
        :style="{
          background: `var(--table-background-${generalStore.settings.tableBackground})`
        }"
      >
        <div class="table__table-item">
          <ActionsItemVue />
        </div>
      </div>
      <div 
        class="table__right"
        ref="rightDivElt"
      >
        <PlayerItemVue 
          v-for="user in roomStore.userListOrdered[screenSize][2]"
          v-bind:key="user.userId"
          :user="{ ...user }"
          :additionnal-classes="{ 
            'three': roomStore.userListOrdered[screenSize][2].length === 3 && screenSizeLarge,
            'large': hasHigherElt
          }"
          place="-right"
        />
      </div>
      <div class="table__bottom">
        <PlayerItemVue 
          v-for="user in roomStore.userListOrdered[screenSize][3]"
          v-bind:key="user.userId"
          :user="{ ...user }"
          :additionnal-classes="{ 
            'three': roomStore.userListOrdered[screenSize][3].length === 3 && !screenSizeLarge,
          }"
          place="-bottom"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
   import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

   import PlayerItemVue from '@/components/game/PlayerItem.vue';
   import ActionsItemVue from './ActionsItem.vue';

   import useRoomStore from '@/store/useRoomStore';
   import useGeneralStore from '@/store/useGeneralStore';
   import VotesResultItem from './VotesResultItem.vue';
   
   const screenSizeLarge = ref(window.innerWidth >= 767);
   const screenSize = ref<'xxs' | 'sm' | 'lg'>('sm');
   const tableLargerThanScreen = ref(false);
   const tableDivElt = ref<HTMLDivElement>();
   const leftDivElt = ref<HTMLDivElement>();
   const rightDivElt = ref<HTMLDivElement>();
   const hasHigherElt = ref(false);
   const throttlePause = ref(false);

   const roomStore = useRoomStore();
   const generalStore = useGeneralStore();

   watch(
      () => roomStore.userListOrdered,
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
   const throttle = (callback: () => void, time: number) => {
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

      generalStore.updateScreenWidth();

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
      window.removeEventListener('resize', () => throttle);
   });


</script>

<style lang="scss">
  @import '../../assets/variables'; 

  .table {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 7rem;
    min-height: calc(100dvh - var(--banner-header-height) - 112px);
    
    @media (min-width: $xs) {
      margin-bottom: 7rem;
    }

    @media (min-width: $m) {
      width: 100vw;
      min-height: calc(100dvh - var(--banner-header-height));
      margin-bottom: 0;

      &.-result {
        margin-bottom: 5rem;
      }

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
    // background-color: red;
    transition: all var(--transition-duration) ease-in-out;
    
    // @media (min-width: $xs) {
    //   grid-template-columns: 8rem 1fr 8rem;
    // }

    @media (min-width: $m) {
      grid-template-columns: 8rem 1fr 8rem;
      grid-template-rows: auto minmax(25rem, 1fr) auto;
      max-width: unset;
      min-width: unset;
      padding: 0 1%;
      width: auto;
    }

  
    @media (min-width: $l) {
      // grid-template-columns: 8rem minmax(45rem, 1fr) 8rem;
      padding: 0 5%;
    }

    > * {
      // border: 1px solid yellow;
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

    padding-bottom: .5rem !important;
    
    @media (min-width: $m) {
      padding-bottom: 1rem !important;
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

    padding-top: .5rem !important;
    
    @media (min-width: $m) {
      padding-top: 1rem !important;
    }
  }
  
  .table__left {
    grid-area: left;
    padding-right: 1rem !important;
  }

  .table__right {
    grid-area: right;
    padding-left: 1rem !important;
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
      min-height: 4.5rem;
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
    
    background-color: rgb(29, 133, 3);
    background: var(--table-background-green);
    background-size: cover;
    
    // background: url('../../assets/images/poker-background-3.jpg');
    // outline: 10px solid #693603;
    box-shadow: inset 0px 5px 23px 2px rgba(0, 0, 0, 0.4705882353);
    position: relative;
    border: 4px solid #000000af;

    &::before {
      content: '';
      position: absolute;
      z-index: -1;
      height: calc(100% + 2rem);
      width: calc(100% + 2rem);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0px 0px 11px 2px rgb(0 0 0 / 79%);
      
      background: rgb(87,53,3);
      background: radial-gradient(circle, rgb(158, 99, 10) 0%, rgba(77, 50, 10, 0.73) 80%, rgba(148, 90, 9, 0.806) 100%);

      border-radius: 50px;
    }


    // background: url('../../assets/images/poker-background-2.jpg');
    // background-size: cover;

    // box-shadow: 0px 15px 30px 5px rgba(0, 0, 0, 0.4705882353);
    // outline: 7px solid #51381f6b;
    border-radius: 40px;

    transition: all var(--transition-duration) ease-in-out;
    
    
    @media (min-width: $xs)  {
      // box-shadow: 0px 30px 40px 12px #00000078;
    }

    @media (min-width: $m)  {
      border-radius: 70px;
      min-width: 31rem;

      &::before {
        border-radius: 85px;
        height: calc(100% + 2.5rem);
      width: calc(100% + 2.5rem);
      }
    }
    
    @media (min-width: $l)  {
      border-radius: 70px;
      min-width: 40rem;
    }
  }

  .table__table-item {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>  