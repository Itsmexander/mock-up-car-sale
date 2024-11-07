import axios from 'axios';

const API_URL = 'http://localhost:8082/';

class CarService {
  register(car) {
    return axios.post(API_URL + 'registerCar', car);
  }

  get(id) {
    return axios.get(`${API_URL}car/${id}`);
  }

  getAll() {
    return axios.get(API_URL + 'store');
  }

  async delete(id) {
    return axios
      .delete(`${API_URL}deleteCar/${id}`)
      .then(response => {
        alert('Car deleted successfully');
        return response.data;
      })
      .catch(error => {
        alert('Error deleting car: ' + error.response.data.message);
      });
  }

  updateCar(id, carInfoUpdateRequest) {
    return axios.put(`${API_URL}update-car/${id}`, carInfoUpdateRequest);
  }
}

export default new CarService();