<template>
  <br />
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Registration</div>
          <div class="card-body">
            <form @submit.prevent="registerUser">
              <div class="form-group">
                <label>First Name</label>
                <input
                  v-model="user.firstname"
                  class="form-control"
                  type="text"
                  placeholder="Enter your first name"
                  @blur="validateFirstname"
                />
                <span v-if="errors.firstname" class="text-danger">{{ errors.firstname }}</span>
                <br />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  v-model="user.surname"
                  class="form-control"
                  type="text"
                  placeholder="Enter your last name"
                  @blur="validateSurname"
                />
                <span v-if="errors.surname" class="text-danger">{{ errors.surname }}</span>
              </div>
              <br />
              <div class="form-group">
                <label>Address</label>
                <input
                  v-model="user.address"
                  class="form-control"
                  type="text"
                  placeholder="Enter your address"
                  @blur="validateAddress"
                />
                <span v-if="errors.address" class="text-danger">{{ errors.address }}</span>
                <br />
                <div class="form-group">
                  <label>Tel No.</label>
                  <input
                    v-model="user.telno"
                    class="form-control"
                    type="text"
                    placeholder="Enter your phone number"
                    @blur="validateTelno"
                  />
                  <span v-if="errors.telno" class="text-danger">{{ errors.telno }}</span>
                </div>
                <br />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="user.email"
                  class="form-control"
                  type="email"
                  placeholder="Enter your email address"
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
                  placeholder="Enter your password"
                  @blur="validatePassword"
                />
                <span v-if="errors.password" class="text-danger">{{ errors.password }}</span>
              </div>
              <br />
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <div class="mt-3">
              <span>Already registered? <router-link to="/login">Login here</router-link></span>
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
import { useRouter } from 'vue-router'

export default {
  setup() {
    const user = ref({
      firstname: '',
      surname: '',
      address: '',
      telno: '',
      email: '',
      password: '',
    })

    const errors = ref({
      firstname: '',
      surname: '',
      address: '',
      telno: '',
      email: '',
      password: '',
    })

    const router = useRouter()

    const validateFirstname = () => {
      errors.value.firstname = user.value.firstname.length < 3 ? 'First name must be at least 3 characters long' : ''
    }

    const validateSurname = () => {
      errors.value.surname = user.value.surname.length < 3 ? 'Last name must be at least 3 characters long' : ''
    }

    const validateAddress = () => {
      errors.value.address = user.value.address.length < 5 ? 'Address must be at least 5 characters long' : ''
    }

    const validateTelno = () => {
      const telPattern = /^[0-9]{10}$/
      errors.value.telno = !telPattern.test(user.value.telno) ? 'Invalid phone number' : ''
    }

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      errors.value.email = !emailPattern.test(user.value.email) ? 'Invalid email address' : ''
    }

    const validatePassword = () => {
      errors.value.password = user.value.password.length < 6 ? 'Password must be at least 6 characters long' : ''
    }

    const registerUser = () => {
      validateFirstname()
      validateSurname()
      validateAddress()
      validateTelno()
      validateEmail()
      validatePassword()

      if (!errors.value.firstname && !errors.value.surname && !errors.value.address && !errors.value.telno && !errors.value.email && !errors.value.password) {
        AuthService.register(user.value).then(response => {
          alert('Registration success! You will be redirected to the login page.')
          router.push({ name: 'Login' })
          console.log(response.data)
        })
      }
    }

    return {
      user,
      errors,
      validateFirstname,
      validateSurname,
      validateAddress,
      validateTelno,
      validateEmail,
      validatePassword,
      registerUser,
    }
  },
}
</script>
<style>
.background-container {
  background-image: url('@/assets/Designer.jpeg'); /* Adjust the path as needed */
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  width: 100%;
  height: 100vh; /* Full viewport height */
  position: relative;
  opacity: 0.8;
}
</style>