<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="loginUser">
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="user.email"
                  class="form-control"
                  type="email"
                  placeholder="Email"
                  @blur="validateEmail"
                />
                <span v-if="errors.email" class="text-danger">{{ errors.email }}</span>
              </div>
              <br />
              <div class="form-group">
                <label>Password</label>
                <input
                  v-model="user.password"
                  class="form-control"
                  type="password"
                  placeholder="Password"
                  @blur="validatePassword"
                />
                <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
              </div>
              <br />
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <div class="mt-3">
              <span>Not registered? <router-link to="/register">Register/SignUp Here</router-link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../AuthService'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

export default {
  setup() {
    const user = ref({
      email: '',
      password: '',
    })

    const errors = ref({
      email: '',
      password: '',
    })
    const router = useRouter()

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      errors.value.email = !emailPattern.test(user.value.email) ? 'Invalid email address' : ''
    }

    const validatePassword = () => {
      errors.value.password = user.value.password.length < 6 ? 'Password must be at least 6 characters long' : ''
    }

    const loginUser = () => {
      validateEmail()
      validatePassword()

      if (!errors.value.email && !errors.value.password) {
        AuthService.login(user.value).then(response => {
          alert('Login successful!')
          router.push({ name: 'Store' })
          console.log(response.data)
        })
      }
    }

    return {
      user,
      errors,
      validateEmail,
      validatePassword,
      loginUser,
    }
  },
}
</script>