import axios from 'axios'

const API_URL = 'http://localhost:8082/auth/'

class AuthService {
  register(user) {
    return axios.post(API_URL + 'register', user)
  }

  login(user) {
    return axios.post(API_URL + 'login', user)
  }

  changePassword(passwordChangeRequest) {
    return axios.post(API_URL + 'passwordChange', passwordChangeRequest)
  }
}

export default new AuthService()
