<script setup>
import { supabase } from '../clients/supabase';
import { ref } from "vue";
import { logout } from "@/utils/logout";


const account = ref();
getSession();

async function getSession() {
	account.value = await supabase.auth.getSession();
	console.log(account.value)
}

const handleLogout = async () => {
  await logout();
  router.push('/login');
};

</script>


<template>
  <div class="about">
	
    <h1>This is protected content</h1>
	<p id="account"> Account: {{  account.data.session.user.email  }}</p>
	<p> Protect the chamber of secrets </p>
	<button @click="logout"> Logout </button>
	
  </div>
</template>



<style>
#account {
	color: green;
}
</style>
