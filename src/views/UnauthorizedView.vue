<template>
	<h1> Travlers only </h1>
	<RouterLink to="/login">Login</RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { supabase } from '../clients/supabase';

</script>