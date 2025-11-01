<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
nav {
  padding: 1rem;
  background: #f0f0f0;
}
nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
