import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/Home/index.vue')
const HomeChatView = () => import('@/views/Home/Chat/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name : 'home',
        component: HomeView,
        children: [
          {
            path: '',
            name: 'chat',
            component: HomeChatView,
          }
        ]
      }
  ],
})

export default router
