<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
          <th>Manufacturer</th>
          <th>Year</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.carId">
          <td>{{ car.carId }}</td>
          <td>{{ car.carName }}</td>
          <td>{{ car.price }}</td>
          <td>{{ car.carDesc }}</td>
          <td>{{ car.manufacturer }}</td>
          <td>{{ car.manufacturedYear }}</td>
          <td>
            <button @click="handleViewClick(car.carId)">view details</button>
            <button @click="handleUpdateClick(car.carId)">Update Info</button>
            <button @click="handleDeleteClick(car.carId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import CarService from '@/CarService'

export default {
  data() {
    return {
      cars: [],
    }
  },
  created() {
    this.fetchCars()
  },
  methods: {
    async fetchCars() {
      try {
        const response = await axios.get('http://localhost:8082/store')
        this.cars = response.data
      } catch (error) {
        console.error('Error fetching cars:', error)
      }
    },
    handleViewClick(id) {
      alert(`Button 'view' clicked for item with ID: ${id}`)
    },
    handleUpdateClick(id) {
      alert(`Button 'update' clicked for item with ID: ${id}`)
      this.$router.push({ name: 'UpdateCar', params: { id: id } })
    },
    handleDeleteClick(id) {
      alert(`Button 'Delete' clicked for item with ID: ${id}`)
      CarService.delete(id)
      location.reload()
    },
  },
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-end;
  background-color: #333;
  padding: 1rem;
}
.nav-list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}
.nav-item {
  margin-left: 1rem;
}
.nav-item a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.nav-item a:hover {
  background-color: #555;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
