<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Car info update</div>
          <div class="card-body">
            <form @submit.prevent="updateCar">
              <div class="form-group">
                <label>Car Name</label>
                <input
                  v-model="car.name"
                  class="form-control"
                  type="text"
                  placeholder="Enter your car name"
                  @blur="validateName"
                />
                <span v-if="errors.name" class="text-danger">{{ errors.name }}</span>
              </div>
              <br />
              <div class="form-group">
                <label>Price</label>
                <input
                  v-model="car.price"
                  class="form-control"
                  type="text"
                  placeholder="Enter the price you want to set"
                  @blur="validatePrice"
                />
                <span v-if="errors.price" class="text-danger">{{ errors.price }}</span>
              </div>
              <br />
              <div class="form-group">
                <label>Other Description</label>
                <input
                  v-model="car.notation"
                  class="form-control"
                  type="text"
                  placeholder="Identifying description (e.g., Defects, Scratch)"
                  @blur="validateNotation"
                />
                <span v-if="errors.notation" class="text-danger">{{ errors.notation }}</span>
              </div>
              <br />
              <div class="form-group">
                <label>Manufacturer</label>
                <input
                  v-model="car.manufacturer"
                  class="form-control"
                  type="text"
                  placeholder="Manufacturer name"
                  @blur="validateManufacturer"
                />
                <span v-if="errors.manufacturer" class="text-danger">{{ errors.manufacturer }}</span>
              </div>
              <br />
              <div class="form-group">
                <label>Manufacture Year</label>
                <input
                  v-model="car.manufacturedYear"
                  class="form-control"
                  type="text"
                  placeholder="Year of manufacture"
                  @blur="validateManufacturedYear"
                />
                <span v-if="errors.manufacturedYear" class="text-danger">{{ errors.manufacturedYear }}</span>
              </div>
              <br />
              <button type="submit" class="btn btn-primary">Confirm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarService from '@/CarService';
import { ref, onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';

export default {
  setup() {
    const car = ref({
      car_id: null, // Initialize as null or appropriate default value
      name: '',
      price: '',
      notation: '',
      manufacturer: '',
      manufacturedYear: '',
    });

    const errors = ref({
      name: '',
      price: '',
      notation: '',
      manufacturer: '',
      manufacturedYear: '',
    });

    const router = useRouter();

    const route = useRoute();

    const fetchCarDetails = (id) => {
      CarService.get(id)
        .then(response => {
          car.value = response.data;
        })
        .catch(error => {
          console.error('Error fetching car details:', error);
        });
    };

    onMounted(() => {
      const carId = 1; // Replace with the actual car ID you want to fetch
      fetchCarDetails(carId);
    });

    const validateName = () => {
      errors.value.name = car.value.name.length < 3 ? 'Car name must be at least 3 characters long' : '';
    };

    const validatePrice = () => {
      const pricePattern = /^[0-9]+(\.[0-9]{1,2})?$/;
      errors.value.price = !pricePattern.test(car.value.price) ? 'Invalid price format' : '';
    };

    const validateNotation = () => {
      errors.value.notation = car.value.notation.length < 5 ? 'Description must be at least 5 characters long' : '';
    };

    const validateManufacturer = () => {
      errors.value.manufacturer = car.value.manufacturer.length < 2 ? 'Manufacturer name must be at least 2 characters long' : '';
    };

    const validateManufacturedYear = () => {
      const yearPattern = /^(19|20)\d{2}$/;
      errors.value.manufacturedYear = !yearPattern.test(car.value.manufacturedYear) ? 'Invalid year format' : '';
    };

    const updateCar = () => {
      validateName();
      validatePrice();
      validateNotation();
      validateManufacturer();
      validateManufacturedYear();

      if (!errors.value.name && !errors.value.price && !errors.value.notation && !errors.value.manufacturer && !errors.value.manufacturedYear) {
        console.log('Updating car with ID:', route.params.id ); 
        CarService.updateCar(route.params.id, car.value)
          .then(response => {
            alert('Car info update success! You will be redirected to the store page.');
            router.push({ name: 'Store' });
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error updating car:', error);
            alert('Error updating car: ' + (error.response ? error.response.data.message : error.message));
          });
      }
    };

    return {
      car,
      errors,
      validateName,
      validatePrice,
      validateNotation,
      validateManufacturer,
      validateManufacturedYear,
      updateCar,
    };
  },
};
</script>