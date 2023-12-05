import { supabase } from '../clients/supabase';




// Function to upload image to storage and return the path
export async function uploadProfileImage(file, userId) {
    const filePath = `profile-images/${userId}/profile-pic`;
  const { error: uploadError } = await supabase.storage
  .from('profile-images')
  .upload(filePath, file, {
      upsert: true // This option ensures that the file is replaced if it already exists
  });

if (uploadError) {
  console.error('Error uploading file:', uploadError);
  return null;
}
return filePath;
}

// Function to update user's profile image URL in the database
export async function updateProfileImage(userId, newImageUrl) {
    const { data, error } = await supabase
        .from('user_profiles')
        .update({ profile_image: newImageUrl })
        .eq('user_id', userId);

    if (error) {
        console.error('Error updating profile image:', error);
    } else {
        console.log('Profile image updated successfully:', data);
    }
}

