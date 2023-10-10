<template>
  <div 
    class="modal-result__container -pie"
    :class="{
      '-sm': counter > 0
    }"
  >
    <ModalCloseButton 
      v-if="counter === 0" 
      @click="handleCloseResultModal" 
    />
    <h2 class="modal-result__title">
      Vote result
    </h2>
    <transition 
      name="counter" 
      mode="out-in"
      appear 
      v-if="counter > 0"
    >
      <p 
        :key="counter"
        class="modal-result__counter"
      >
        {{ counter }}
      </p>
    </transition>
    <PieChart 
      v-if="counter === 0"
      :chartData="chartData"
      :plugins="[ChartDataLabels]"
      :options="plugin" 
      class="modal-result__result-pie"
    />
    <ModalConfirmButton 
      v-if="counter === 0"
      text="Close"
      @click="handleCloseResultModal" 
      class="modal-result__close-button"
    />
  </div>
</template>

<script setup lang="ts">
   import ModalCloseButton from '@/components/modal/ModalCloseButtonItem.vue';
   import ModalConfirmButton from '@/components/modal/ModalConfirmButtonItem.vue';
   import useModalStore from '@/store/useModalStore';
   import useRoomStore from '@/store/useRoomStore';
   import { PieChart } from 'vue-chart-3';
   import { Chart, registerables } from "chart.js";
   import ChartDataLabels from 'chartjs-plugin-datalabels';
  
   import { getColorPalette } from '@/utils/utils';

   import type { ChartOptions, ChartData } from "chart.js";
   import { onMounted, ref } from 'vue';
   import { setMessageDefault } from '@/utils/bannerMessages';

   const modalStore = useModalStore();
   const roomStore = useRoomStore();
   const counter = ref(3);

   const startCounter = () => {
      if (counter.value > 0) {
         setTimeout(() => {
            counter.value = counter.value - 1;
            startCounter();
         }, 1000);
      } 
      else {
         document.body.style.pointerEvents = 'all';
      }
   };

   const handleCloseResultModal = () => {
      modalStore.closeModal();
      setMessageDefault();
      roomStore.setShowCard(true);
   };

   onMounted(() => {
      document.body.style.pointerEvents = 'none';
      startCounter();
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
    width: 90vw;
    max-width: 25rem;
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

    @media (min-width: $xs) {
      max-width: 35rem;
      
      &.-sm {
        max-width: 25rem;
      }
    }

    @media (min-width: $m) {
      max-width: 35rem;
      
      &.-sm {
        max-width: 20rem;
      }
    }

    @media (min-width: $l) {
      max-width: 45rem;
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

  .modal-result__result-vote {
    margin-top: 1.5rem;
  }

  .modal-result__result-pie {
    margin-top: 1.5rem;
  }
  
  .modal-result__counter {
    margin-top: 1.5rem;
    font-size: 4rem;
    font-weight: 600;
  }

  .counter-enter-active {
    transition: all .2s ease-in;
  }

  .counter-leave-active {
    transition: all .2s ease-out;
  }

  .counter-enter-from {
    transform: translateY(20px);
    opacity: 0;
  }

  .counter-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

  .modal-result__close-button {
    opacity: 0;
    margin-top: 3rem;
    animation: closeButtonEnter .5s ease-in forwards .5s;
  }

  @keyframes closeButtonEnter {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>