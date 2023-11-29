<script setup>
import { supabase } from '../clients/supabase';
import { ref } from "vue";
import { logout } from "@/utils/logout";
import { onMounted } from 'vue';
import { nanoid } from 'nanoid';


const baseURL = 'https://oerpddeqepyvfzuecggs.supabase.co/storage/v1/object/public/echoimages/';

const fullImageUrl = (imagePath) => {
  return baseURL + imagePath;
};

const account = ref();
getSession();

async function getSession() {
	account.value = await supabase.auth.getSession();
	console.log(account.value)
	console.log('Account session data:', account.value);
}

const handleLogout = async () => {
  await logout();
  router.push('../login');
};

// New task logic
const newTask = ref('');
const selectedImage = ref(null);

const selectedFile = ref(null);  // Add this line to declare selectedFile

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 9 * 1024 * 1024) { // 9MB limit
    selectedFile.value = file;
    selectedImage.value = URL.createObjectURL(file);
  } else {
    alert('File is too large. Please select a file smaller than 9MB.');
  }
};

const addTask = async () => {
  if (!newTask.value) {
    console.log('No task value entered');
    return;
  }

  // Define userId within the function scope
  const userId = account.value?.data?.session?.user?.id;
  if (!userId) {
    console.log('User is not logged in for addTask');
    return;
  }

  let imageUrl = null; // Initialize imageUrl to null

  // If a file is selected, upload it to Supabase Storage
  if (selectedFile.value) {
    const filePath = `echoimages/${nanoid()}-${selectedFile.value.name}`;
    const { error: uploadError } = await supabase.storage
      .from('echoimages')
      .upload(filePath, selectedFile.value);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return;
    }

    imageUrl = filePath; // Update imageUrl with the path
  }

  // Add the task with or without the image URL
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        { name: newTask.value, user_id: userId, image_url: imageUrl }
      ]);

    if (error) {
      console.error('Error adding task:', error);
    } else {
      console.log('Task added successfully:', data);
      tasks.value.push(data[0]);
      newTask.value = '';
      selectedFile.value = null;
      selectedImage.value = null;
    }
  } catch (e) {
    console.error('Error during task addition:', e);
  }
};


const tasks = ref([]);

const loadTasks = async () => {
  const userId = account.value?.data?.session?.user?.id;
  console.log('Loading tasks for user ID:', userId);

  if (userId) {
    try {
      let { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }

      // Generate public URLs for images
      tasksData = await Promise.all(tasksData.map(async (task) => {
        if (task.image_url) {
          const imagePath = task.image_url.replace('echoimages/', ''); // Adjust path
          console.log('Image path for getPublicUrl:', imagePath); // Log the imagePath

          const { publicURL, error: urlError } = supabase.storage
            .from('echoimages')
            .getPublicUrl(imagePath);

          console.log('Public URL:', publicURL, 'Error:', urlError); // Log the publicURL and any error

          if (urlError) {
            console.error('Error getting public URL:', urlError);
            return task;
          }

          return { ...task, publicImageUrl: publicURL };
        }
        return task;
      }));

      console.log('Fetched tasks with public URLs:', tasksData); // Log the final tasks data
      tasks.value = tasksData;
    } catch (e) {
      console.error('An error occurred while fetching tasks:', e);
    }
  } else {
    console.log('User is not logged in for taskData');
  }
};
const deleteTask = async (taskId) => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .match({ id: taskId });

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      // Refresh the tasks list
      await loadTasks();
    }
  } catch (e) {
    console.error('An error occurred while deleting the task:', e);
  }
};


onMounted(async () => {
  await loadTasks();
});

// Call loadTasks at appropriate lifecycle hook or after user login





</script>


<template>
	<div class="about">
	  <div class="header">
		<h1>Odyssey Book</h1>
		<p id="account">Account: {{ account.data.session.user.email }}</p>
		<h2>📝 Log an Odyssey 📝</h2>
	  </div>
	  <div class="task-form-container">
		<label for="file-input" class="file-input-label">
		  <img src="../cam.svg" alt="Choose file" />
		</label>
		<input
		  type="file"
		  id="file-input"
		  @change="handleFileSelect"
		  accept="image/*"
		  style="display: none;"
		/>
		<input
		  type="text"
		  placeholder="Write your Odyssey"
		  v-model="newTask"
		  class="task-input"
		/>
		<button @click="addTask" class="add-button">Add</button>
	  </div>
	  <div v-if="selectedImage" class="image-preview">
		<img :src="selectedImage" alt="Preview" />
	  </div>
	  <ul class="task-list">
		<li v-for="task in tasks" :key="task.id" class="task-item">
		  <div v-if="task.image_url" class="image-container">
			<img :src="fullImageUrl(task.image_url)" class="task-image" alt="Task Image" />
		  </div>
		  <div class="text-container">
			{{ task.name }}
			<img src="../icons8-trash-24.svg" @click="deleteTask(task.id)" class="delete-icon" alt="Delete" />
		  </div>
		</li>
	  </ul>
	</div>
  </template>
  
  <style>
  #account {
	color: green;
  }
  
  .header {
	text-align: center;
  }
  
  .task-form-container {
	display: flex;
	align-items: center;
	gap: 8px;
	justify-content: center;
  }
  
  .file-input-label {
	cursor: pointer;
  }
  
  .task-input {
	flex-grow: 1;
  }
  
  .image-preview img {
	max-width: 100px;
	max-height: 100px;
  }
  
  .task-list {
	padding: 0;
	list-style: none;
  }
  
  .task-list .task-item {
	background-color: #f9f9f9; /* Light grey background */
	border-radius: 10px; /* Rounded corners */
	padding: 5px; /* Padding around the content */
	margin: 10px 0; /* Spacing between tasks */
	display: flex;
	align-items: center;
	gap: 6px;
	height: 100px; /* Fixed height for the box */
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* subtle shadow for depth */
  }
  
  .image-container {
	flex-shrink: 0;
	width: 100px; /* Fixed width for the image container */
	height: 100px; /* Fixed height for the image container */
	display: flex;
	justify-content: center;
	align-items: center;
  }
  
  .task-image {
	max-width: 100%;
	max-height: 100%;
	border-radius: 5px; /* Optional: rounded corners for the images */
  }
  
  .text-container {
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 15px; /* Padding inside the text container */
  }
  
  .delete-icon {
	cursor: pointer;
	margin-left: auto; /* Align the delete icon to the right */
  }
  </style>