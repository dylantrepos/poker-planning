<template>
  <div 
    class="room-view__actions"
  >
    <div 
      class="room-view__actions-reveal" 
      ref="revealBtn"
      @click="!roomStore.isVoteClosed ? handleOpenModalConfirmResult() : handleRestartGame()"
    >
      {{ roomStore.isVoteClosed ? 'Restart' : 'Reveal' }}
    </div>
    <div 
      class="room-view__actions-vote"
      ref="voteBtn"
      @click="handleOpenModalVote"
      :class="{
        '-closed': roomStore.isVoteClosed
      }"
    >
      <div class="room-view__actions-vote-cards">
        <div class="room-view__actions-vote-card -center"></div>
        <div class="room-view__actions-vote-card -left"></div>
        <div class="room-view__actions-vote-card -right"></div>
      </div>
    </div>
    <div 
      class="room-view__actions-settings"
      ref="settingsBtn"
      @click="handleOpenModalSettings"
    >
      Settings
    </div>
  </div>
</template>

<script setup lang="ts">
   import { onMounted, onUnmounted, ref } from 'vue';
   
   import useModalStore from '@/store/useModalStore';
   import useRoomStore from '@/store/useRoomStore';
   import { setMessageReveal, setMessageVote, setMessageSettings, setMessageDefault } from '../../utils/bannerMessages';
   import { emitOpenVote } from '@/sockets/emitsFunctions';
   import useGeneralStore from '@/store/useGeneralStore';
   
   const modalStore = useModalStore();
   const roomStore = useRoomStore();
   const generalStore = useGeneralStore();

   const handleOpenModalVote = () => {
      modalStore.openVoteModal();
   };
   
   const handleOpenModalSettings = () => {
      modalStore.openSettingsModal();
   };

   const handleOpenModalConfirmResult = () => {
      modalStore.openResultConfirmModal();
   };

   const handleRestartGame = () => {
      useRoomStore().setIsVoteClosed(false);
      emitOpenVote();
   };

   const revealBtn = ref<HTMLDivElement>();
   const voteBtn = ref<HTMLDivElement>();
   const settingsBtn = ref<HTMLDivElement>();

   onMounted(() => {
     
      if (generalStore.screenWidth > 768) {
         voteBtn.value?.addEventListener('mouseover', setMessageVote);
         revealBtn.value?.addEventListener('mouseover', setMessageReveal);
         settingsBtn.value?.addEventListener('mouseover', setMessageSettings);
         [revealBtn.value, voteBtn.value, settingsBtn.value].forEach((elt => (
            elt?.addEventListener('mouseout', setMessageDefault)
         )));
      } else {
         voteBtn.value?.addEventListener('click', setMessageVote);
      }
   });

   onUnmounted(() => {
      revealBtn.value?.removeEventListener('mouseover', setMessageReveal);
      voteBtn.value?.removeEventListener('mouseover', setMessageVote);
      settingsBtn.value?.removeEventListener('mouseover', setMessageSettings);
      [revealBtn.value, voteBtn.value, settingsBtn.value].forEach((elt => (
         elt?.removeEventListener('mouseout', setMessageDefault)
      )));
   });


</script>

<style lang="scss">
  @import '../../assets/variables'; 
  
  .room-view__actions {
    min-width: 23rem;
    
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    // background: rgba(128, 0, 128, 0.409);
    height: 7rem;
    padding: .5rem 1.5rem;
    gap: .5rem;
    z-index: 1;
    background: linear-gradient(0deg, black, transparent);
    backdrop-filter: blur(1px);
    
    @media (min-width: $xxs) {
      padding: .5rem 5dvw;
    }

    @media (min-width: $xs) {
      padding: .5rem 15dvw;
    }

    @media (min-width: $m) {
      position: absolute;
      background: none;
      backdrop-filter: blur(0px);
      padding: 0;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      width: auto;
      height: 12rem;
      bottom: unset;
      left: 50%;
      transform: translateX(-50%);
      gap: 1rem;
    }

    @media (min-width: $l) {
      gap: 1.5rem;
    }
  }

  .room-view__actions-reveal, .room-view__actions-settings {
    height: 4rem;
    width: 4rem;
    margin-top: .5rem;
    border: 1px white solid;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > * {
      pointer-events: none;
    }

    @media (min-width: $xxs) {
      height: 5rem;
      width: 5rem;
      margin-top: 0;
    }

    @media (min-width: $m) {
      height: 5rem;
      width: 5rem;
      margin-top: 0;
      transition: all linear .25s;
      box-shadow: 
            0 0 .2rem #ffffff00,
            0 0 .2rem #ffffff00,     
            0 0 2rem #bb13fe00,
            0 0 0.8rem #bb13fe00,
            0 0 2.8rem #bb13fe00,
            inset 0 0 1.3rem #bb13fe00; 

      &:hover {
        box-shadow: 
            0 0 .2rem #fff,
            0 0 .2rem #fff,
            0 0 2rem #efefef,
            0 0 0.8rem #efefef,
            0 0 2.8rem #efefef,
            inset 0 0 1.3rem #efefef; 

            font-weight: 500;
            letter-spacing: .1rem;

            // text-shadow:
            //   0 0 7px #fff,
            //   0 0 10px #fff,
            //   0 0 21px #fff,
            //   0 0 42px #0fa,
            //   0 0 82px #0fa,
            //   0 0 92px #0fa,
            //   0 0 102px #0fa,
            //   0 0 151px #0fa;
      }
    }

    @media (min-width: $l) {
      height: 6rem;
      width: 6rem;
      margin-top: 0;
    }
  }

  .room-view__actions-vote{
    display: flex;
    justify-content: center;
    border: 1px white solid;
    border-radius: 100px;
    cursor: pointer;
    
    height: 11rem;
    width: 11rem;

    > * {
      pointer-events: none;
    }

    img {
      margin-top: 1.5rem;
      height: 8rem;
      width: auto;
    }

    &.-closed {
      cursor: no-drop;

      .room-view__actions-vote-card {
        background: linear-gradient(163deg, #3b3b3b 0%, #5c5c5c 97.35%);
      }
    }

    @media (min-width: $xs) {
      height: 13rem;
      width: 13rem;

      img {
        margin-top: .5rem;
        height: 10rem;
        width: auto;
      }
    }
    
    @media (min-width: $m) {
      align-items: center;
      left: unset;
      top: unset;
      transform: translateX(0);
      height: 8rem;
      width: 8rem;
      margin-top: 0rem;

      transition: box-shadow linear .25s;
      box-shadow: 
            0 0 .2rem #ffffff00,
            0 0 .2rem #ffffff00,     
            0 0 2rem #bb13fe00,
            0 0 0.8rem #bb13fe00,
            0 0 2.8rem #bb13fe00,
            inset 0 0 1.3rem #bb13fe00; 

      img {
        height: 6rem;
        width: auto;
      }

      &:hover:not(.-closed) {
        box-shadow: 
            0 0 .2rem #fff,
            0 0 .2rem #ffffff77,
            0 0 2rem #efefef67,
            0 0 0.8rem #05a80d37,
            0 0 2.8rem #efefef,
            inset 0 0 1.3rem #efefef; 
        
        
        .room-view__actions-vote-card {
          &.-center {
            animation: card-hover-center 3s ease-in-out infinite;
          }
          &.-left {
            animation: card-hover-left 3s ease-in-out .5s infinite;
          }
          &.-right {
            animation: card-hover-right 3s ease-in-out 1s infinite;
          }
        }
        
      }
    }
  }

  .border-animation {
    position: absolute;
    width: 0;
    height: 0; 
    // border: 1px white solid; /* Start with a white border */
    border-radius: 50%;
    z-index: -1;
  }

  .room-view__actions-vote-cards {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    position: absolute;
  }
  
  .room-view__actions-vote-card {
    position: absolute;
    background-color: white;
    width: 2.8rem;
    height: 4.5rem;
    border-radius: 4px;
    top: calc(50% - -11px);
    left: calc(50% - -1px);
    transform: translate(-50%, -50%);
    border: 0.5px solid rgba(255, 255, 255, 0.47);
    background: linear-gradient(163deg, #FFF 0%, #E9E9E9 97.35%);
    box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.25);
    transition: all linear .25s;

    &.-center {
      z-index: 1;
    }

    &.-left {
      top: calc(50% - 10px);
      left: calc(50% - 52px);
      transform: rotate(-15deg);
    }

    &.-right {
      top: calc(50% - 2px);
      left: unset;
      right: calc(50% - 53px);
      transform: rotate(15deg);
    }

    @media (min-width: $xs) {
      width: 3.5rem;
      height: 5.5rem;
      top: calc(50% + 5px);

      &.-left {
        top: calc(50% - 19px);
        left: calc(50% - 65px);
      }

      &.-right {
        top: calc(50% - 10px);
        right: calc(50% - 65px);
      }
    }

    @media (min-width: $m) {
      width: 2.1rem;
      height: 3.5rem;
      top: calc(50% - 10px);
      left: 50%;

      &.-center {
        z-index: 1;
      }
  
      &.-left {
        top: calc(50% - 25px);
        left: calc(50% - 40px);
      }
  
      &.-right {
        top: calc(50% - 21px);
        right: calc(50% - 40px);
      }
      height: 3.5rem;
    }
  }

  @keyframes card-hover-center {
    0%, 15% {
      top: calc(50% - 10px);
      left: 50%;
    }
    5%, 10% {
      top: calc(50% - 13px);
      left: 50%;
    }
    100% {
      top: calc(50% - 10px);
      left: 50%;
    }
  }

  @keyframes card-hover-left {
    0%, 15% {
      top: calc(50% - 25px);
      left: calc(50% - 40px);
    }
    5%, 10% {
      top: calc(50% - 28px);
      left: calc(50% - 42px);
    }
    100% {
     top: calc(50% - 25px);
      left: calc(50% - 40px);
    }
  }

  @keyframes card-hover-right {
    0%, 15% {
       top: calc(50% - 21px);
        right: calc(50% - 40px);
    }
    5%, 10% {
       top: calc(50% - 24px);
        right: calc(50% - 42px);
    }
    100% {
       top: calc(50% - 21px);
        right: calc(50% - 40px);
    }
  }
</style>  