//This is for testing purposes will be removed from ghpages once bug is fixed
import { supabase } from '../clients/supabase';

export const fetchImages = async () => {
  try {
    console.log('Fetching images...');
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .is('image_url', null, false) // Fetch only tasks with an image
      .limit(3); // Limit to 3 for testing

    if (error) {
      console.error('Error fetching images:', error);
      return null;
    }

    console.log('Images fetched:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchImages:', error);
    return null;
  }
};