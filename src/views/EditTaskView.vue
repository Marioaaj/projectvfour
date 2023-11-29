<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '../clients/supabase';

const router = useRouter();
const route = useRoute();
const taskId = route.params.taskId;
console.log('Task ID:', taskId); // Check if taskId is correct

const task = ref(null);

// Redefine or import fullImageUrl function if needed
const fullImageUrl = (imagePath) => {
  return 'https://oerpddeqepyvfzuecggs.supabase.co/storage/v1/object/public/echoimages/' + imagePath;
};

const fetchTask = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', taskId)
    .single();

  console.log('Fetched data:', data); // Check fetched data
  console.log('Fetch error:', error); // Check for any errors

  if (error) {
    console.error('Error fetching task:', error);
  } else {
    task.value = data;
  }
};

onMounted(fetchTask);

const goToSecretView = () => {
  router.push({ name: 'secret' });
};

// Function to update the task
const updateTask = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .update({ name: task.value.name, image_url: task.value.image_url })
    .eq('id', taskId);

  if (error) {
    console.error('Error updating task:', error);
  } else {
    console.log('Task updated successfully:', data);
    goToSecretView(); // Go back to the diary page after update
  }
};

</script>












<template>
    <div v-if="task" class="task-details">
      <img v-if="task.image_url" :src="fullImageUrl(task.image_url)" alt="Task Image" class="task-image" />
      <input type="text" v-model="task.name" class="task-input" />
      <div class="button-container">
        <button class="rounded-button" @click="updateTask">Save Changes</button>
        <button class="rounded-button" @click="goToSecretView">Cancel</button>
      </div>
    </div>
    <div v-else>
      <p>Loading task...</p>
    </div>
  </template>













<style>
  /* Style for the container of the task details */
  .task-details {
    text-align: center; /* Center align everything */
    margin: auto; /* Center the container */
  }

  .task-image {
    max-width: 100px; /* Maximum width */
    max-height: 100px; /* Maximum height */
    border: 3px solid #118AB2; /* Solid border with color */
    border-radius: 10px; /* Rounded corners */
    margin-bottom: 20px; /* Space below the image */
  }

  .task-input {
    width: 100%; /* Full width */
    padding: 10px;
    margin-bottom: 20px;
    font-size: 1.2em;
    border: 2px solid #118AB2;
    border-radius: 5px;
  }

  .button-container {
    display: flex;
    flex-direction: column; /* Stack buttons vertically */
    align-items: center; /* Center align buttons */
    gap: 10px; /* Space between buttons */
  }

  /* Style for the text */
  .task-text {
    margin-top: 10px; /* Space above the text */
    font-size: 1.2em; /* Bigger text */
  }

  /* Style for the 'Back to Diary' button */
  .rounded-button {
    background-color: #118AB2;
    color: #FFD166;
    border: none;
    border-radius: 15px;
    padding: 10px 20px;
    font-size: 25px;
    font-weight: bold;
    margin: 10px auto; /* Center buttons and add spacing */
    transition-duration: 0.4s;
    cursor: pointer;
    width: 200px; /* Fixed width for buttons */
  }
  .rounded-button:hover {
    background-color: #EF476F;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.9);
  }
  .task-text {
  margin-top: 10px; /* Space above the text */
  font-size: 1.5em; /* Increased font size */
  font-weight: bold; /* Make the text bold */
}
</style>