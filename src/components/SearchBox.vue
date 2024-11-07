<template>
    <div>
      <input v-model="query" @input="search" placeholder="Search...">
      <ul>
        <li v-for="item in results" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        query: '',
        results: []
      };
    },
    methods: {
      search() {
        if (this.query.length > 2) {
          axios.get(`http://localhost:8082/car/search?query=${this.query}`)
            .then(response => {
              this.results = response.data;
            });
        }
      }
    }
  };
  </script>
  