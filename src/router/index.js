import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/department',
    name: 'department',
    component: () => import(/* webpackChunkName: "department" */ '../components/DepartmentList.vue')
  },
  {
    path: '/page',
    name: 'page',
    component: () => import(/* webpackChunkName: "page" */ '../components/PageList.vue')
  },
  {
    path: '/questions',
    name: 'questions',
    component: () => import(/* webpackChunkName: "questions" */ '../components/QuestionsList.vue')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "setting" */ '../components/SettingList.vue')
  },
  {
    path: '/support',
    name: 'support',
    component: () => import(/* webpackChunkName: "support" */ '../components/SupportList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
