<template>
  <div id="app">
    <Navbar />
    <BackgroundContainer/>
    <router-view>
    </router-view>
  </div>
</template>

<script>
import BackgroundContainer from './components/background-container.vue';
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    BackgroundContainer
  },
}
</script>


