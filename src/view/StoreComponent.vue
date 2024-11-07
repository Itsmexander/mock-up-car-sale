<template>
  <div>
    <input v-model="searchQuery" placeholder="Search cars by name..." class="search-box" />
    <br/>
    <div v-if="filteredCars.length > 0">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Manufacturer</th>
            <th>Year</th>
            <th>Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in filteredCars" :key="car.carId">
            <td>{{ car.carId }}</td>
            <td>{{ car.name }}</td>
            <td>{{ parseFloat(car.price).toFixed(2) }} ฿</td>
            <td>{{ car.notation }}</td>
            <td>{{ car.manufacturer }}</td>
            <td>{{ car.manufacturedYear }}</td>
            <td>{{ formatDate(car.timestamp) }}</td>
            <td>
              <button @click="handleUpdateClick(car.carId)" class="action-button">Update Info on car id: {{ car.carId }}</button>
              <button @click="handleDeleteClick(car.carId)" class="action-button">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br/>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>


<script>
import axios from 'axios';
import CarService from '@/CarService';
import dateMixin from '@/mixins/dateMixin';

export default {
  mixins: [dateMixin],
  data() {
    return {
      cars: [],
      searchQuery: '',
      currentPage: 1,
      pageSize: 15,
      totalPages: 0,
    };
  },
  created() {
    this.fetchCars();
  },
  methods: {
    async fetchCars() {
      try {
        const response = await axios.get('http://localhost:8082/store', {
          params: {
            page: this.currentPage - 1,
            size: this.pageSize
          }
      });
      this.cars = response.data;

      // Log the entire response object to debug
      console.log('Response:', response);

      // Access the header directly using the exact key
      const totalItemsHeader = response.headers['x-total-count'];
      console.log('Total Items Header:', totalItemsHeader);

      const totalItems = parseInt(totalItemsHeader, 10);
      console.log('Parsed Total Items:', totalItems);

      this.totalPages = Math.ceil(totalItems / this.pageSize);
      console.log('Total Pages:', this.totalPages);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },
    handleUpdateClick(carId) {
      console.log('ID:', carId);
      alert(`Button 'update' clicked for item with ID: ${carId}`);
      this.$router.push({ name: 'UpdateCar', params: { carId } });
    },
    handleDeleteClick(id) {
      alert(`Button 'Delete' clicked for item with ID: ${id}`);
      CarService.delete(id);
      location.reload();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchCars();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchCars();
      }
    },
  },
  computed: {
    filteredCars() {
      return this.cars.filter(car =>
        car.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        car.manufacturer.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
};
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
.search-box {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px; /* Adds space before the search box */
}

.action-button {
  margin-right: 20px; /* Adds space between the buttons */
}

.pagination {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px; /* Adds space above the pagination controls */
}
</style>
