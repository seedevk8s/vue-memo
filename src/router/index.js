import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import AddMemo from '@/views/AddMemo.vue'; // 추가할 컴포넌트

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/memos/add', // 추가된 경로
      name: 'AddMemo',
      component: AddMemo, // 연결된 컴포넌트
    },
  ]
})

export default router
