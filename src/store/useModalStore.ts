import { defineStore } from "pinia";
// eslint-disable-next-line
import { extend } from '@vue/shared';
import ModalVoteItemVue from "@/components/modal/ModalVoteItem.vue";
import ModalResultConfirmItemVue from "@/components/modal/ModalResultConfirmItem.vue";
import ModalResultItemVue from "@/components/modal/ModalResultItem.vue";
import ModalSettingsItemVue from "@/components/modal/ModalSettingsItem.vue";
import { shallowRef } from "vue";
import useRoomStore from "./useRoomStore";

const component = extend({});

type VueComponent = InstanceType<typeof component>;

interface IModalProps {
  component: null | VueComponent;
  props?: object;
}

interface IModalState {
  modalState: IModalProps;
}

const basicState = { component: null, props: {} };

export default defineStore("modal-store", {
  state: (): IModalState => ({ 
    modalState: basicState, 
  }),
  actions: {
    openModal(payload: IModalProps) {
      const { props, component } = payload;

      // Prevent scroll
      const body = document.body;
      if (body) body.style.overflow = "hidden";

      this.modalState = { component, props: props};
    },
    openVoteModal() {
      if (!useRoomStore().isVoteClosed) {
        this.openModal({
          component: shallowRef(ModalVoteItemVue), 
        });
      }
    },
    openResultConfirmModal() {
      this.openModal({
        component: shallowRef(ModalResultConfirmItemVue), 
      });
    },
    openResultModal() {
      this.openModal({
        component: shallowRef(ModalResultItemVue), 
      });
    },
    openSettingsModal() {
      this.openModal({
        component: shallowRef(ModalSettingsItemVue), 
      });
    },
    closeModal() {
      this.modalState = basicState;

      const body = document.body;
      if (body) body.style.overflow = "auto";
    }
  },
  getters: {}
});