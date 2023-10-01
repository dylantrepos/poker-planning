import { defineStore } from "pinia";
// eslint-disable-next-line
import { extend } from '@vue/shared';
import ModalVoteItemVue from "@/components/modal/ModalVoteItem.vue";
import { shallowRef } from "vue";

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
    openVoteModal(info: string) {
      this.openModal({
        component: shallowRef(ModalVoteItemVue), 
        props: {
          text: info
        }
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