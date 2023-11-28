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
		<button class="rounded-button" @click="login"> Login </button>
		<button class="rounded-button" @click="logout"> Logout </button>
		<button class="rounded-button" @click="createAccount"> Register </button>
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

let session = ref(null);

async function login() {
  console.log("run");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  if (error) {
    console.log(error);
  } else {
    console.log(data);
    session.value = data; // Store the session data
  }
}

async function seeUser() {
	const localUser = await supabase.auth.getSession();
	console.log(localUser.data.session) //, had to add this to troubleshoot, because couldnt upload stuff may delete later
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
    background-image: url('../echo.png'); /* Replace with your image path */
    background-size: cover; /* Cover the entire viewport */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    margin: 0; /* Remove default margin */
    height: 100vh; /* Full viewport height */
  }
  .rounded-button {
    background-color: #118AB2; /* Button fill color */
    color: #FFD166;            /* Text color */
    border: salmon;
    border-radius: 15px;       /* Adjust this value to control the roundness */
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 25px;
	font-weight: bold;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
	display: flex;
  	flex-direction: column; /* Stack children elements vertically */
 	align-items: center;   /* Center-align the buttons */
	width: 150px;
	height: auto;
    line-height: normal; 
	margin-bottom: 12px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4); /* Add shadow to the button */     

  }

  .rounded-button:hover {
    background-color: #EF476F; /* Color changes when hovered */
    color: #FFD166;
	box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.9); /* Increase shadow on hover */
  }
  .rounded-button:last-child {
    margin-bottom: -5px; /* Remove the margin from the last button */
}
</style>