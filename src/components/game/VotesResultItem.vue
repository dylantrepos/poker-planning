<template>
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
    class="vote-result__pie"
  />
</template>

<script setup lang="ts">
   import { PieChart } from 'vue-chart-3';
   import { Chart, registerables } from "chart.js";
   import ChartDataLabels from 'chartjs-plugin-datalabels';
   
   import { getColorPalette } from '@/utils/utils';
   import useRoomStore from '@/store/useRoomStore';

   const roomStore = useRoomStore();

   import type { ChartOptions, ChartData } from "chart.js";
   import { onBeforeMount, onBeforeUnmount } from 'vue';


   onBeforeMount(() => {
      console.log('bef good build res');
      console.log(roomStore.votes);
      console.log(roomStore.voteResults);
   });

   onBeforeUnmount(() => {
      console.log('aft good build');
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


<style lang="scss">
  @import '../../assets/variables'; 
  
  .vote-result__pie {
    max-height: 10rem;
    margin-bottom: 1rem;
  }
</style>