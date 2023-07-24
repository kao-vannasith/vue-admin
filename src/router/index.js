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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
