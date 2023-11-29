<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/secret">Diary</RouterLink>
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
  color: white;
  transition: background-color 0.3s; 
 }

 nav a:hover {
  background-color: rgba(255, 255, 255, 0.3); 
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 900px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1em;
  padding: 2em 0 2em 0;
}

.mainBorder {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  border: solid 1px black;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1em;
  padding: 2em 0 2em 0;
}
.text-layer {
  position: relative;
  z-index: 2;
  /* Additional styling as needed */
}
</style>