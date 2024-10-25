import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from './view/RegisterComponent.vue'
import LoginComponent from './view/LoginComponent.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import StoreComponent from './view/StoreComponent.vue'
import AddCarComponent from './view/AddCarComponent.vue'
import ChangePasswordComponent from './view/ChangePasswordComponent.vue'
import UpdateCarComponent from './view/UpdateCarComponent.vue'

const routes = [
  { path: '/register', name: 'Register', component: RegisterComponent },
  { path: '/login', name: 'Login', component: LoginComponent },
  { path: '/store', name: 'Store', component: StoreComponent },
  {
    path: '/car/register_car',
    name: 'CarRegister',
    component: AddCarComponent,
  },
  {
    path: '/passwordChange',
    name: 'ChangePassword',
    component: ChangePasswordComponent,
  },
  { path: '/updateCar/:id', name: 'UpdateCar', component: UpdateCarComponent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
