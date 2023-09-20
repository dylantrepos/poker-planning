import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RoomView from '@/views/RoomView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

import { checkRoomExists, checkServerState } from '@/utils/room';
import { state } from '@/utils/state';

import type { RoomId } from '@/types/GenericType';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
          state.roomExists = false;
        }
      }
    },
    {
      path: '/404',
      name: 'PageNotFound',
      component: NotFoundView
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
});

router.beforeEach(async () =>  {
  try {
    await checkServerState();
  } catch {
    state.serverLive = false;
  }
});

export default router;
