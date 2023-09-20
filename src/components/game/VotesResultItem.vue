<template>
  <h4>
    Vote final
  </h4>
  <div 
    v-if="Object.keys(state.voteResults).length === 0"
  >
    No vote !
  </div>
  <PieChart v-else
            :chartData="chartData"
            :plugins="[ChartDataLabels]"
            :options="plugin" />
</template>

<script setup lang="ts">
   import { PieChart } from 'vue-chart-3';
   import { Chart, registerables } from "chart.js";
   import ChartDataLabels from 'chartjs-plugin-datalabels';
  
   import { state } from '@/utils/state';
   import { getColorPalette } from '@/utils/utils';

   import type { ChartOptions, ChartData } from "chart.js";

   Chart.register(...registerables);

   const plugin: ChartOptions<"pie">  = {
      plugins: {
         datalabels: {
            color: '#ffffff',
            font: {
               size: 20,
            },
            formatter: (_, context) => Object.keys(state.voteResults)[context.dataIndex],
         },
         tooltip: {
            bodySpacing: 5,
            callbacks: {
               label: (value) =>  Object.values(state.voteResults)[value.dataIndex].users,
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
            data: Object.values(state.voteResults).map(e => e.vote),
         },
      ],
   };

</script>