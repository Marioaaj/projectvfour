<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Hello There</RouterLink>
        <RouterLink to="/secret">Secret</RouterLink>
		<RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <div class="content">
	<RouterView />
  </div>

</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent black background */
  padding: 0.5em;
  border-radius: 0.5em;
  margin: 1em 0; /* Add some margin above and below the navigation bar */
}

nav a {
  padding: 1em;
  text-decoration: none; /* Remove underline from links */
  color: white; /* White text color for contrast */
  transition: background-color 0.3s; /* Smooth background color change on hover */
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.3); /* Light background on hover for feedback */
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  border: solid 1px black;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1em;
  padding: 2em 0 2em 0;
  background-color: #d9d9d9;
}

.text-layer {
  position: relative;
  z-index: 2;
  /* Additional styling as needed */
}
</style>