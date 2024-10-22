import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/Register.vue'
import App from '@/App.vue'
import ProductComponent from '@/components/ProductComponent.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/auth', name: 'login', component: App },
  { path: '/register', name: 'Register', component: Register },
  { path: '/store', name: 'Store', component: ProductComponent },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
