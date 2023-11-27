<template>
	<h1> Login </h1>
	<div class="inputContainer">
		<label for="email"> Email: </label>
		<input type="email" id="email" v-model="email">
	</div>

	<div class="inputContainer">
		<label for="email"> Password: </label>
		<input type="password" id="password" v-model="password">
	</div>


	<div class="buttonContainer">
		<button class="rounded-button" @click="createAccount"> Create </button>
		<button class="rounded-button" @click="login"> Login </button>
		<button class="rounded-button" @click="seeUser"> See user </button>
		<button class="rounded-button" @click="logout"> Logout </button>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../clients/supabase"

let email = ref("");
let password = ref("");
let firstName = ref("");

async function createAccount() {
	const { user, error } = await supabase.auth.signUp({
		email: email.value,
		password: password.value,
		options: {
			data: {
				first_name: firstName.value
			}
		}
	})
	if (error)
	{
		console.log(error);
	}
	else
	{
		console.log(user);
	}
}

async function login() {
	console.log("run")
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	if (error)
	{
		console.log(error);
	}
	else
	{
		console.log(data);
	}
}

async function seeUser() {
	const localUser = await supabase.auth.getSession();
	console.log(localUser.data.session)
}

async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		console.log(error);
	}
	else {
		console.log("Sign out success")
	}
}
</script>

<style>
 body {
    background-image: url('echo.png'); /* Replace with your image path */
    background-size: cover; /* Cover the entire viewport */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    margin: 0; /* Remove default margin */
    height: 100vh; /* Full viewport height */
  }
  .rounded-button {
    background-color: #118AB2; /* Button fill color */
    color: #FFD166;            /* Text color */
    border: none;
    border-radius: 15px;       /* Adjust this value to control the roundness */
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 25px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
  }

  .rounded-button:hover {
    background-color: #EF476F; /* Color changes when hovered */
    color: #FFD166;
  }
</style>