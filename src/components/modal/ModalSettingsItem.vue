<template>
  <div class="modal-settings__container">
    <ModalCloseButton />
    <h2 class="modal-settings__title">
      Settings
    </h2>
    <p class="modal-settings__description">
      Custom your game as you want
    </p>
    <form 
      ref="formElt"
      class="modal-settings__form"
      @submit.prevent="handleSave"
    >
      <div 
        class="modal-settings__item"
      >
        <p>
          Table background
        </p>
        <div class="modal-settings__item-choices -table-background">
          <input 
            v-for="color in tableBackgroundColors"
            v-bind:key="color"
            type="radio"
            :value="color"
            name="table-background" 
            :class="[`-${color}`]"
            v-model="tableBgChoice"
            :checked="tableBgChoiceBase ===  color"
          />
        </div>
      </div>
      <div 
        class="modal-settings__item"
      >
        <p>
          Card background
        </p>
        <div class="modal-settings__item-choices -card-background">
          <input 
            v-for="color in cardBackgroundColors"
            v-bind:key="color"
            type="radio"
            :value="color"
            name="card-background" 
            :class="[`-${color}`]"
            v-model="cardBgChoice"
            :checked="cardBgChoiceBase ===  color"
          />
        </div>
      </div>
      <ModalConfirmButton 
        text="Save settings"
        class="modal-settings__form-submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
   import ModalCloseButton from '@/components/modal/ModalCloseButtonItem.vue';
   import ModalConfirmButton from '@/components/modal/ModalConfirmButtonItem.vue';
   import useModalStore from '@/store/useModalStore';
   import useGeneralStore from '@/store/useGeneralStore';
   import { tableBackgroundColors, cardBackgroundColors } from '@/utils/utils';

   import { ref } from 'vue';

   const modalStore = useModalStore();
   const generalStore = useGeneralStore();
   const formElt = ref();
   const tableBgChoice = ref();
   const cardBgChoice = ref();
   const tableBgChoiceBase = ref(generalStore.settings.tableBackground);
   const cardBgChoiceBase = ref(generalStore.settings.cardBackground);

   const handleSave = (): void => {
      modalStore.closeModal();

      if (tableBgChoice.value && tableBgChoice.value !== tableBgChoiceBase.value) {
         generalStore.setTableBackground(tableBgChoice.value);
      }

      if (cardBgChoice.value && cardBgChoice.value !== cardBgChoiceBase.value) {
         generalStore.setCardBackground(cardBgChoice.value);
      }
   };
</script>

<style scoped lang="scss">
  @import '../../assets/variables.scss'; 

  .modal-settings__container {
    background: linear-gradient(145deg, rgba(0, 0, 0, 0.938), rgba(0, 0, 0, 0.388));
    padding: 2rem 1rem;
    position: relative;
    
    border-radius: 1rem;
    width: 20rem;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    
    > * {
      color: #fff;
    }
    
    @media (min-width: $xxs) {
      padding: 2rem;
      min-width: 24rem;
    }

    @media (min-width: $xs) {
      min-width: 30rem;
    }
  }

  .modal-settings__title {
    font-size: 1.2rem;
    font-weight: 500;
    
    @media (min-width: $m) {
      font-size: 1.5rem;
    }
  }

  .modal-settings__description {
    font-size: 1rem;
    font-weight: 200;
    margin-top: 1rem;
    
    @media (min-width: $m) {
      font-size: 1.2rem;
    }
  }

  .modal-settings__item {
    margin-top: 1rem;
    
  }

  .modal-settings__item-choices {
    display: flex;
    gap: 2rem;
    padding-top: 1rem;
  }

  .modal-settings__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .modal-settings__form-submit {
    margin-top: 3rem;
  }

  .modal-settings__item-choices {
    input {
      height: 60px;
      width: 60px;
      position: relative;
      cursor: pointer;

      &::before {
        content: '';
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        height: calc(100%);
        width: calc(100%);
        border: 2px solid rgba(255, 255, 255, 0);
        background-color: transparent;
        border-radius: 14px;
        z-index: 2;
        transition: all .15s ease-in-out;
      }
      
      &:checked {
        &::before {
          height: calc(100% + 5px);
          width: calc(100% + 5px);
          border: 2px solid white;
        }
      }

      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 10px;
      }
    }
  }

  .-table-background input{
    &.-green::after {
      background: var(--table-background-green);
    }
    
    &.-red::after {
      background: var(--table-background-red);
    }
    
    &.-blue::after {
      background: var(--table-background-blue);
    }
  }

  .-card-background input {

    &::after {
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
    }

    &.-stripe-purple::after {
      background: var(--card-background-stripe-purple);
    }
    
    &.-black::after {
      background: var(--card-background-black);
    }
  }


</style>