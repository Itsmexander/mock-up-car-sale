<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="background-container"></div>
</template>
<script>
  export default{
    name : 'background-container',
  }
</script>
<style>
.background-container {
  background-image: url('@/assets/Designer.jpeg'); /* Adjust the path as needed */
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image */
  width: 100%;
  height: 100vh; /* Full viewport height */
  position: relative;
  opacity: 0.8;
}
</style>