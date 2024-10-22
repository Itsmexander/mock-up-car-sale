<template>
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
                  v-model="user.firstName"
                  class="form-control"
                  type="text"
                  placeholder="Enter first name"
                />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input
                  v-model="user.surname"
                  class="form-control"
                  type="text"
                  placeholder="Enter last name"
                />
              </div>
              <div class="form-group">
                <label>Address</label>
                <input
                  v-model="user.address"
                  class="form-control"
                  type="text"
                  placeholder="Enter your address"
                />
                <div class="form-group">
                  <label>Tel No.</label>
                  <input
                    v-model="user.telNO"
                    class="form-control"
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="user.email"
                  class="form-control"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  v-model="user.password"
                  class="form-control"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
            <div class="mt-3">
              <span
                >Already registered?
                <router-link to="/login">Login here</router-link></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../AuthService'

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        address: '',
        telNO: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    registerUser() {
      AuthService.register(this.user).then(response => {
        console.log(response.data)
      })
    },
  },
}
</script>
