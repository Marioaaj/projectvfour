<template>
	<div class="ok">
	  <div class="inputContainer">
		<input type="email" id="email" v-model="email" placeholder="Email" class="styled-input">
	  </div>
  
	  <div class="inputContainer">
		<input type="password" id="password" v-model="password" placeholder="Password" class="styled-input">
	  </div>
	</div>
	
	<div class="buttonContainer">
	  <button class="rounded-button" @click="login">Login</button>
	  <button class="rounded-button" @click="logout">Logout</button>
	  <button class="rounded-button" @click="createAccount">Register</button>
	  <button class="rounded-button" @click="goToHome">Home</button>
	</div>
  </template>

<script setup>
import { ref } from "vue";
import { supabase } from "../clients/supabase"
import { useRouter } from 'vue-router';

const router = useRouter();

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
    router.push('/secret'); // Navigate to the secret page
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
const goToHome = () => {
  router.push('/');
};
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

.styled-input {
  width: 300px; /* Wider input fields */
  padding: 12px; /* Bigger and taller input fields */
  font-size: 18px; /* Bigger font in input fields */
  opacity: 1; /* 50% opacity for placeholders */
  border-radius: 5px; /* Rounded corners */
  border: 1px solid #ccc; /* Border for input fields */
  display: block; /* Make the input fill the width of its container */
  margin: 0 auto; /* Center align the input fields */
}

.styled-input::placeholder {
  color: #000; /* Color for placeholder text */
  opacity: 0.5; /* 50% opacity for placeholders */
}

.rounded-button {
  background-color: #118AB2;
  color: #FFD166;
  border: salmon;
  border-radius: 15px;
  padding: 10px 20px;
  text-align: center;
  display: block; /* Stack buttons vertically */
  font-size: 25px;
  font-weight: bold;
  margin: 10px auto; /* Center buttons and add spacing */
  transition-duration: 0.4s;
  cursor: pointer;
  width: 150px;
  height: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.rounded-button:hover {
  background-color: #EF476F;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.9);
}

.ok {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  border: solid 1px black;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1em;
  padding: 2em 0 2em 0;
  background-color: #118ab2e6;
}

.buttonContainer {
  margin-top: 20px; /* Spacing above the first button */
}

.inputContainer {
  margin-bottom: 15px; /* Spacing between input fields */
  width: 100%; /* Make sure the container fills the width of its parent */
  display: flex; /* Use flex to center align the input fields */
  justify-content: center; /* Center align the input fields horizontally */
}
</style>