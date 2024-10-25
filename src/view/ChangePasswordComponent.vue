<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Change Password</div>
          <div class="card-body">
            <form @submit.prevent="changePassword">
              <div class="form-group">
                <label>Old Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="passwordChangeRequest.oldPassword"
                  placeholder="Old Password"
                  required
                />
              </div>
              <br />
              <div class="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="passwordChangeRequest.newPassword"
                  placeholder="New Password"
                  required
                />
              </div>
              <br />
              <button
                type="submit"
                class="btn btn-primary"
                onclick="changePassword()"
              >
                Change Password
              </button>
            </form>
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
      passwordChangeRequest: {
        id: 1,
        oldPassword: '',
        newPassword: '',
      },
    }
  },
  methods: {
    changePassword() {
      AuthService.changePassword(this.passwordChangeRequest).then(response => {
        alert(`Password changed success! You will be redirect to login page.`)
        this.$router.push({ name: 'Login' })
        console.log(response.data)
      })
    },
  },
}
</script>
