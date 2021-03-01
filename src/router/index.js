import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '../layout/index'
import EmptyLayout from '../layout/empty'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    name: 'Dashboard',
    component: MainLayout,
    icon: 'mdi-view-dashboard',
    path: '/dashboard',
    open: true,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: 'Home',
        component: () => import('../views/Dashboard/Dashboard'),
        path: '',
      },
    ],
  },
  {
    name: 'Helper',
    component: MainLayout,
    icon: 'mdi-truck',
    subtitle: 'Components',
    path: '/helper',
    open: false,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: 'Notification-Simple',
        component: () => import('../views/Helper/Helper'),
        path: '',
      },
    ],
  },
  {
    name: 'Auth',
    component: EmptyLayout,
    icon: 'mdi-clipboard-account-outline',
    subtitle: 'Pages',
    path: '/',
    open: false,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'Home',
        })
      }
      next()
    },
    children: [
      {
        name: 'Login',
        component: () => import('../views/Auth/Login'),
        path: '',
      },
      {
        name: 'Logout',
        component: () => import('../views/Auth/Login'),
        path: 'logout',
      },
    ],
  },
  {
    name: 'Picking',
    component: MainLayout,
    icon: 'mdi-account-box-outline',
    path: '/picking',
    open: false,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: '',
        component: () => import('../views/Picking/Picking'),
        path: '',
        meta: { hideNavigation: true },
      },
    ],
  },
  {
    name: 'Packing',
    component: MainLayout,
    icon: 'mdi-email-outline',
    path: '/packing',
    open: false,
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login',
        })
      }
      next()
    },
    children: [
      {
        name: '',
        component: () => import('../views/Packing/Packing'),
        path: '',
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
