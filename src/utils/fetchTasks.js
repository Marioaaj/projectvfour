import { supabase } from '../clients/supabase'; // Adjust the path as needed

export async function fetchLimitedTasks() {
    try {
      let { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .limit(3); // Limit to 3 tasks for testing
  
      if (error) {
        console.error('Error fetching tasks:', error);
        return null;
      }
      
      return tasksData;
    } catch (e) {
      console.error('An error occurred while fetching tasks:', e);
      return null;
    }
  }