<template>
  <div>
    <nav class="navbar">
      <ul class="nav-list">
        <li class="nav-item"><a href="/store">Store</a></li>
        <li class="nav-item"><a href="/register">Register</a></li>
        <li class="nav-item"><a href="/login">Login</a></li>
        <li class="nav_item"><a href="/car/register_car">register a car</a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
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
</style>
