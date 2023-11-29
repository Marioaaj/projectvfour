<template>
	<div class="ok">
	  <h1>Travelers only</h1>
	  <img src="../catmeme.jpg" alt="Cat Meme" class="rounded-image" />
	  <RouterLink to="/login" class="styled-link">Login</RouterLink>
	</div>
  </template>
  
  <script setup>
  import { RouterLink } from "vue-router";
  import { supabase } from '../clients/supabase';
  </script>
  
  <style>
  .ok {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 600px;
	border: solid 1px black;
	margin-left: auto;
	margin-right: auto;
	border-radius: 1em;
	padding: 2em 0 2em 0;
	background-color: #06d69edc;
  }
  
  .rounded-image {
	max-width: 300px; /* Adjust size as needed */
	border-radius: 50%; /* Circular shape */
	margin: 20px 0; /* Space above and below the image */
  }
  
  .styled-link {
	padding: 10px 20px;
	background-color: #118AB2;
	color: #FFD166;
	text-decoration: none;
	font-size: 1.2em;
	border-radius: 8px;
	transition: background-color 0.3s;
  }
  
  .styled-link:hover {
	background-color: #EF476F;
  }
  </style>