<template>
    <br />
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
                    @blur="validateOldPassword"
                    required
                  />
                  <span v-if="errors.oldPassword" class="text-danger">{{ errors.oldPassword }}</span>
                  </div>
                  <br />
                  <div class="form-group">
                  <label>New Password:</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="passwordChangeRequest.newPassword"
                    placeholder="New Password"
                    @blur="validateNewPassword"
                    required
                  />
                  <span v-if="errors.newPassword" class="text-danger">{{ errors.newPassword }}</span>
                  </div>
                  <br />
                <button type="submit" class="btn btn-primary">Change Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import AuthService from '../AuthService'
import { ref } from 'vue'

export default {
  setup() {
    const passwordChangeRequest = ref({
      id: 1,
      oldPassword: '',
      newPassword: '',
    })

    const errors = ref({
      oldPassword: '',
      newPassword: '',
    })

    const router = useRouter()

    const validateOldPassword = () => {
      errors.value.oldPassword = passwordChangeRequest.value.oldPassword.length < 6 ? 'Old password must be at least 6 characters long' : ''
    }

    const validateNewPassword = () => {
      errors.value.newPassword = passwordChangeRequest.value.newPassword.length < 6 ? 'New password must be at least 6 characters long' : ''
    }

    const changePassword = () => {
      validateOldPassword()
      validateNewPassword()

      if (!errors.value.oldPassword && !errors.value.newPassword) {
        AuthService.changePassword(passwordChangeRequest.value).then(response => {
          alert('Password changed successfully! You will be redirected to the login page.')
          router.push({ name: 'Login' })
          console.log(response.data)
        })
      }
    }

    return {
      passwordChangeRequest,
      errors,
      validateOldPassword,
      validateNewPassword,
      changePassword,
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