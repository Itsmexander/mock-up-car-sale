<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Car registration</div>
          <div class="card-body">
            <form @submit.prevent="registerCar">
              <div class="form-group">
                <label>Car Name</label>
                <input
                  v-model="car.carName"
                  class="form-control"
                  type="text"
                  placeholder="Enter your car name"
                />
              </div>
              <br />
              <div class="form-group">
                <label>Price</label>
                <input
                  v-model="car.price"
                  class="form-control"
                  type="text"
                  placeholder="Enter the price you want to set"
                />
              </div>
              <br />
              <div class="form-group">
                <label>Other Description</label>
                <input
                  v-model="car.carDesc"
                  class="form-control"
                  type="text"
                  placeholder="identifing description (ie. Defects, Scratch)"
                />
              </div>
              <br />
              <div class="form-group">
                <label>Manufacturer</label>
                <input
                  v-model="car.manufacturer"
                  class="form-control"
                  type="text"
                  placeholder="manufacture name"
                />
              </div>
              <br />
              <div class="form-group">
                <label>manufacture year</label>
                <input
                  v-model="car.manufacturedYear"
                  class="form-control"
                  type="text"
                  placeholder="year of manufacture"
                />
              </div>
              <br />
              <button type="submit" class="btn btn-primary">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarService from '../CarService'

export default {
  data() {
    return {
      car: {
        car_id: 1,
        carName: '',
        price: '',
        carDesc: '',
        manufacturer: '',
        manufacturedYear: 1,
      },
    }
  },
  methods: {
    registerCar() {
      CarService.register(this.car).then(response => {
        console.log(response.data)
      })
    },
  },
}
</script>
