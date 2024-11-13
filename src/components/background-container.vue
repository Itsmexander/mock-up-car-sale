<template>
  <div class="background-container"></div>
</template>

<script>
export default {
  name: 'BackgroundContainer',
};
</script>

<style scoped>
.background-container {
  background-image: url('@/assets/Designer.jpeg'); /* Adjust the path as needed */
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  width: 100%;
  height: 100vh; /* Full viewport height */
  position: fixed; /* Fixed position to cover the entire viewport */
  top: 0;
  left: 0;
  z-index: -1; /* Ensure it stays behind other content */
  opacity: 0.7;
}
</style>