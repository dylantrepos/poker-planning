<template>
  <div class="modal-vote__container">
    <ModalCloseButton />
    <h2 class="modal-vote__title">
      Options
    </h2>
    <p class="modal-vote__description">
      Comming soon ...
    </p>
    <div class="modal-vote__cards-container">
     
    </div>
    <ModalConfirmButton 
      text="Save options"
      @click="handleSave" 
    />
  </div>
</template>

<script setup lang="ts">
   import ModalCloseButton from '@/components/modal/ModalCloseButtonItem.vue';
   import ModalConfirmButton from '@/components/modal/ModalConfirmButtonItem.vue';
   import useModalStore from '@/store/useModalStore';

   const store = useModalStore();

   const handleSave = (): void => {
      store.closeModal();
   };
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal-vote__container {
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

  .modal-vote__title {
    font-size: 1.2rem;
    font-weight: 500;
    
    @media (min-width: $m) {
      font-size: 1.5rem;
    }
  }

  .modal-vote__description {
    font-size: 1rem;
    font-weight: 200;
    margin-top: 1rem;
    
    @media (min-width: $m) {
      font-size: 1.2rem;
    }
  }

  .modal-vote__cards-container {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-auto-rows: 1fr;
    grid-auto-flow: row;
    justify-items: center;
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

  .modal-vote__cards-button {
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