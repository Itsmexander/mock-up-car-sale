import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

import StoreComponent from '@/components/StoreComponent.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/auth', name: 'Login', component: App },
  { path: '/register', name: 'Register', component: Register },
  { path: '/store', name: 'Store', component: StoreComponent },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
