import { supabase } from "../clients/supabase"; // Adjust the import path as needed

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(error);
    } else {
        console.log("Sign out success");
    }
}