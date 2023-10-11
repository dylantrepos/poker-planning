import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RoomView from '@/views/RoomView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

import { checkRoomExists, checkServerState } from '@/utils/room';

import type { RoomId } from '@/types/GenericType';
import useGeneralStore from '@/store/useGeneralStore';
import useRoomStore from '@/store/useRoomStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/room/:id',
      name: 'GameRoom',
      component: RoomView,
      beforeEnter: async (from) => {
        try {
          await checkRoomExists(from.params.id as RoomId);
        } catch {
          const roomStore = useRoomStore();
          roomStore.roomExists = false;
        }
      }
    },
    {
      path: '/404',
      name: 'PageNotFound',
      component: NotFoundView
    },
    {
      path: '/:catchAll(.*)*',
      component: NotFoundView
    }
  ]
});

router.beforeEach(async () =>  {
  const generalStore = useGeneralStore();

  try {
    await checkServerState();
  } catch {
    generalStore.setServerStatus(false);
  }
});

export default router;
