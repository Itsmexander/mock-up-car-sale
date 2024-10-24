import axios from 'axios'

const API_URL = 'http://localhost:8082/'

class CarService {
  register(car) {
    return axios.post(API_URL + 'cars/register_car', car)
  }

  get(car) {
    return axios.get(API_URL + 'car', car)
  }

  getall(car) {
    return axios.get(API_URL + 'store', car)
  }
}

export default new CarService()
