// src/utils/logout.js
import { supabase } from "../clients/supabase"; // Adjust the import path as needed
import { useRouter } from 'vue-router';

export async function logout() {
    const router = useRouter();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
    } else {
        console.log("Sign out success");
        router.push('/login'); // Navigate to login page
    }
}