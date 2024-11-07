<template>
  <div>
    <input v-model="searchQuery" placeholder="Search cars by name..." class="search-box" />
    <br/>
    <div v-if="filteredCars.length > 0">
      <table>
        <thead>
          <tr>
            <th @click="sort('carId')">ID</th>
            <th @click="sort('name')">Name</th>
            <th @click="sort('price')">Price</th>
            <th @click="sort('notation')">Description</th>
            <th @click="sort('manufacturer')">Manufacturer</th>
            <th @click="sort('manufacturedYear')">Year</th>
            <th @click="sort('timestamp')">Timestamp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in sortedCars" :key="car.carId">
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
import dateMixin from '@/mixins/dateMixin';

export default {
  mixins: [dateMixin],
  data() {
    return {
      searchQuery: '',
      cars: [],
      currentPage: 1,
      pageSize: 15,
      sortKey: 'carId',
      sortOrder: 'asc'
    };
  },
  computed: {
    filteredCars() {
      return this.cars.filter(car => car.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
    sortedCars() {
      return this.filteredCars.sort((a, b) => {
        let modifier = this.sortOrder === 'asc' ? 1 : -1;
        if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
        if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
        return 0;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredCars.length / this.pageSize);
    }
  },
  methods: {
    fetchCars() {
    axios.get('http://localhost:8082/store', {
      params: {
        query: this.searchQuery,
        sortBy: this.sortKey,
        sortOrder: this.sortOrder,
        page: this.currentPage - 1,
        size: this.pageSize
      }
    })
    .then(response => {
      console.log(response.data); // Log the response data
      this.cars = response.data;
    })
    .catch(error => {
      console.error("There was an error fetching the cars!", error);
    });
  },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
      this.fetchCars();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchCars();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchCars();
      }
    },
    handleUpdateClick(carId) {
      console.log('ID:', carId);
      alert(`Button 'update' clicked for item with ID: ${carId}`);
      this.$router.push({ name: 'UpdateCar', params: { carId } });
    },
    handleDeleteClick(carId) {
      alert(`Button 'Delete' clicked for item with ID: ${carId}`);
      axios.delete(`/car/${carId}`)
        .then(() => {
          this.fetchCars();
        })
        .catch(error => {
          console.error("There was an error deleting the car!", error);
        });
    }
  },
  mounted() {
    this.fetchCars();
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
