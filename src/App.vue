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
}

nav a {
	padding: 1em;
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
