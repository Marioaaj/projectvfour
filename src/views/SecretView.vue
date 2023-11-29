<script setup>
import { supabase } from '../clients/supabase';
import { ref } from "vue";
import { logout } from "@/utils/logout";
import { onMounted } from 'vue';
import { nanoid } from 'nanoid';
import { useRouter } from 'vue-router';

const baseURL = 'https://oerpddeqepyvfzuecggs.supabase.co/storage/v1/object/public/echoimages/';

//This is for the edit button on a task or the pencil and notepad it should redirect you and pass the parameters
const router = useRouter();



const editTask = (task) => {
  router.push({ name: 'editTask', params: { taskId: task.id } });
};


//This is for the memories button which triggers load task
const manualDataLoad = async () => {
  console.log('Manual data load triggered');
  await loadTasks();
};


const fullImageUrl = (imagePath) => {
  return baseURL + imagePath;
};

const account = ref();

const fileInput = ref(null);




getSession();

async function getSession() {
  try {
    const sessionData = await supabase.auth.getSession();
    console.log('Session data retrieved:', sessionData);
    account.value = sessionData;
  } catch (error) {
    console.error('Error retrieving session:', error);
  }
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
  

  if (!userId) {
    console.log('User is not logged in or userId is not available');
    return;
  }

  try {
    let { data: tasksData, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId);
	  

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    console.log('Tasks fetched from database:', tasksData);

      // Generate public URLs for images
      tasksData = await Promise.all(tasksData.map(async (task) => {
      if (task.image_url) {
        const imagePath = task.image_url.split('/').pop();
        console.log('Generating public URL for image:', imagePath);

        const { publicURL, error: urlError } = supabase.storage
          .from('echoimages')
          .getPublicUrl(imagePath);

        if (urlError) {
          console.error('Error getting public URL:', urlError);
          return task;
        }

        console.log('Public URL for image:', publicURL);
        return { ...task, publicImageUrl: publicURL };
      }
      return task;
    }));

    console.log('Tasks with public URLs:', tasksData);
    tasks.value = tasksData;
  } catch (e) {
    console.error('An error occurred while fetching tasks:', e);
  }
};

//function to edit task bubbles




//This is Delete task function without this I cant delete stuff
const deleteTask = async (taskId) => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .match({ id: taskId });

    if (error) {
      console.error('Error deleting task:', error);
    } else {
      console.log('Task deleted successfully:', taskId);
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
	<div class="ok">
	  <div class="header">
		<h1>📝 Log an Odyssey 📝</h1>
		<p id="account">Account: {{ account.data.session.user.email }}</p>
		<button @click="handleLogout">Sign Out</button>
		<button @click="manualDataLoad" class="load-data-button">Reveal Memories</button>
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
		  </div>
		  <div class="button-container">
			<img src="../edit.svg" @click="() => editTask(task)" class="edit-icon" alt="Edit" />
			<img src="../trash.svg" @click="deleteTask(task.id)" class="delete-icon" alt="Delete" />
		  </div>
		</li>
	  </ul>
	</div>
  </template>
  








  <style>
  .button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-icon, .delete-icon {
  cursor: pointer;
  margin: 5px; /* Adjust spacing as needed */
}
  .edit-input {
    margin-right: 10px;
    /* Add other styles as needed */
  }

  .task-display {
    display: flex;
    align-items: center;
    /* Add other styles as needed */
  }
  #account {
	color: rgb(255, 255, 255);
  }

  .edit-icon {
    cursor: pointer;
    margin-right: 10px; /* Space between edit and delete icons */
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
  background-color: #118ab2;
  border-radius: 10px;
  padding: 5px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  .load-data-button {
	margin-bottom: 10px; /* Example style */
}

.ok {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 600px;
  border: solid 1px black;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1em;
  padding: 2em 0 2em 0;
  background-color: #06d69edc;
}

  </style>