import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RoomView from '../views/RoomView.vue';
import { checkServerState } from '@/utils/room';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/room/:id',
      name: 'Game room',
      component: RoomView
    }
  ]
});

router.beforeEach(() =>  {
  checkServerState();
});

export default router;
