import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JoinView from '../views/JoinView.vue'
import LoginView from '@/views/LoginView.vue'
import MapView from '@/views/MapView.vue'
import BoardView from '@/views/BoardView.vue'
import BoardList from '@/components/board/BoardList.vue'
import BoardDetail from '@/components/board/BoardDetail.vue'
import BoardWrite from '@/components/board/BoardWrite.vue'
import BoardModify from '@/components/board/BoardModify.vue'
import { isAuthorizedUser, isAuthenticatedUser } from '../utils/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: JoinView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: async (to, from) => {
        const isAuthenticated = await isAuthenticatedUser()
        if (isAuthenticated) {
          console.log('이미 로그인 상태입니다.')
          return { name: 'home' }
        }
      }
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/qna',
      name: 'board',
      // component: TheBoardView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: BoardView,
      redirect: { name: 'article-list' },
      children: [
        {
          path: 'list',
          name: 'article-list',
          component: BoardList
        },
        {
          path: 'view/:articleno',
          name: 'article-view',
          component: BoardDetail
        },
        {
          path: 'write',
          name: 'article-write',
          component: BoardWrite
        },
        {
          path: 'modify/:articleno',
          name: 'article-modify',
          component: BoardModify
        }
      ]
    }
  ]
})

export default router
