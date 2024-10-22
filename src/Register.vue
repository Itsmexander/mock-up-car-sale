<template>
  <div>
    <form @submit.prevent="register">
      <input v-model="user.username" placeholder="Username" />
      <input v-model="user.password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    register() {
      axios
        .post('http://localhost:8082/auth/register', this.user)
        .then(response => {
          console.log(response.data)
        })
    },
  },
}
</script>
