<template>
	<h1> Unauthorized </h1>
	<RouterLink to="/login">Login</RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { supabase } from '../clients/supabase';

</script>