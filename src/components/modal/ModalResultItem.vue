<template>
  <div class="modal-result__container">
    <ModalCloseButton />
    <h2 class="modal-result__title">
      Vote result
    </h2>
    <div 
      v-if="Object.keys(roomStore.voteResults).length === 0"
    >
      No vote !
    </div>
    <PieChart 
      v-else
      :chartData="chartData"
      :plugins="[ChartDataLabels]"
      :options="plugin" 
    />
    <ModalConfirmButton 
      text="Close"
      @click="store.closeModal" 
    />
  </div>
</template>

<script setup lang="ts">
   import ModalCloseButton from '@/components/modal/ModalCloseButtonItem.vue';
   import ModalConfirmButton from '@/components/modal/ModalConfirmButtonItem.vue';
   import useModalStore from '@/store/useModalStore';
   import useRoomStore from '@/store/useRoomStore';
   import { onBeforeMount, onBeforeUnmount } from 'vue';
   import { PieChart } from 'vue-chart-3';
   import { Chart, registerables } from "chart.js";
   import ChartDataLabels from 'chartjs-plugin-datalabels';
  
   import { getColorPalette } from '@/utils/utils';

   import type { ChartOptions, ChartData } from "chart.js";

   const store = useModalStore();
   const roomStore = useRoomStore();
   

   onBeforeMount(() => {
      console.log('bef build res');
      console.log(roomStore.votes);
      console.log(roomStore.voteResults);
   });

   onBeforeUnmount(() => {
      console.log('aft build res');
   });

   
   Chart.register(...registerables);

   const plugin: ChartOptions<"pie">  = {
      plugins: {
         datalabels: {
            color: '#ffffff',
            font: {
               size: 20,
            },
            formatter: (_, context) => Object.keys(roomStore.voteResults)[context.dataIndex],
         },
         tooltip: {
            bodySpacing: 5,
            callbacks: {
               label: (value) =>  Object.values(roomStore.voteResults)[value.dataIndex].users,
            },
            caretPadding: 20,
            displayColors: false,
            padding: 10,
         }
      }
   };

   const chartData: ChartData<'pie'> = {
      datasets: [
         {
            backgroundColor: getColorPalette(),
            data: Object.values(roomStore.voteResults).map(e => e.vote),
         },
      ],
   };
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal-result__container {
    background: linear-gradient(145deg, rgba(0, 0, 0, 0.938), rgba(0, 0, 0, 0.388));
    padding: 2rem 1rem;
    position: relative;
    
    border-radius: 1rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    > * {
      color: #fff;
    }

    @media (min-width: $xxs) {
      padding: 2rem;
    }
  }

  .modal-result__title {
    font-size: 1.2rem;
    font-weight: 500;
    
    @media (min-width: $m) {
      font-size: 1.5rem;
    }
  }

  .modal-result__description {
    font-size: 1rem;
    font-weight: 200;
    margin-top: 1rem;
    
    @media (min-width: $m) {
      font-size: 1.2rem;
    }
  }

  .modal-result__cards-container {
    display: flex;
    flex-direction: column;
 
    gap: 1rem;
    margin: 1rem 0;

    @media (min-width: $xxs) {
      margin: 2rem 0;
    }

    @media (min-width: $xs) {
      margin: 2rem;
    }
    
    @media (min-width: $m) {
      margin: 3rem 2rem;
      grid-template-columns: repeat(5, auto);
    }
  }

  .modal-result__cards-button {
    background: linear-gradient(180deg, #FFF 0%, #D4D4D4 100%);
    border: 1px solid #FFF;
    height: 5rem;
    width: 3rem;
    border-radius: .4rem;
    font-size: 1rem;
    font-weight: 500;
    pointer-events: all;
    cursor: pointer;
    transition: all .2s ease-in-out;

    * {
      color: black;
      font-weight: 500;
      stroke: black;
    }

    @media (min-width: $xxs) {
      font-size: 1.3rem;
      height: 6rem;
      width: 4rem;
    }
    
    @media (min-width: $m) {
      &:hover {
        border: 2px solid #1dca02;
        
        * {
          color: #1dca02;
          stroke: #1dca02;
        }
  
        &.-chosen { 
          border-color: red;
        }
      }
    }


    &.-chosen {
      background: linear-gradient(180deg, #1dca02 0%, #1f5e12 100%);
      
      * {
        color: white;
        stroke: white;
      }
    }
  }
</style>