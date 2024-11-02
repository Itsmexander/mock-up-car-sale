import StoreComponent from '../view/StoreComponent.vue'
import AddCarComponent from '../view/AddCarComponent.vue'
import ChangePasswordComponent from '../view/ChangePasswordComponent.vue'
import UpdateCarComponent from '../view/UpdateCarComponent.vue'
import RegisterComponent from '../view/RegisterComponent.vue'
import LoginComponent from '../view/LoginComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    { path: '/register', name: 'Register', component: RegisterComponent },
    { path: '/login', name: 'Login', component: LoginComponent },
    { path: '/store', name: 'Store', component: StoreComponent },
    {
      path: '/registerCar',
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

export default router
