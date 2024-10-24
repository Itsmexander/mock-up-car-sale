import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from './components/RegisterComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import StoreComponent from './components/StoreComponent.vue'
import AddCarComponent from './components/AddCarComponent.vue'

const routes = [
  { path: '/', component: RegisterComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/login', component: LoginComponent },
  { path: '/store', name: 'Store', component: StoreComponent },
  { path: '/car/register_car', component: AddCarComponent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
