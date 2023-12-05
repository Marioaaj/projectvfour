import { supabase } from '../clients/supabase';

export async function loadTasks() {
  // Logic to load tasks from Supabase
  const user = supabase.auth.user();

  if (!user) {
    console.error('User is not logged in');
    return [];
  }
  try {
    const { data: tasksData, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error loading tasks:', error);
      return [];
    }

    return tasksData;
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
}




