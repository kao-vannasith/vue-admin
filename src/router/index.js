import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./../views/Dashboard')
  },
  {
    path: '/About',
    name: 'about',
    component: () => import('./../views/About.vue')
  },
  {
    path: '/Product',
    name: 'product',
    component: () => import('./../components/Product/TableProduct.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('./../components/Login/Login.vue')
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('./../components/Product/TableProfile.vue')
  },
  {
    path: '/Customer',
    name: 'Customer',
    component: () => import('./../components/Product/TableCustomer.vue')
  },
  {
    path: '/Member',
    name: 'Member',
    component: () => import('./../components/Product/TableMember.vue')
  },
  {
    path: '/Setting',
    name: 'Setting',
    component: () => import('./../components/Product/TableSetting.vue')
  },
  {
    path: '/Overview',
    name: 'Overview',
    component: () => import('./../views/Overview.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
