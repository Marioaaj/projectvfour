<script setup>
import { ref } from 'vue';
import { fetchLimitedTasks } from '@/utils/fetchTasks';
import { fetchImages } from '@/utils/fetchImages';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push('/login');
};

const goToAbout = () => {
  router.push('/about');
};

// //legacy function
// const tasks = ref([]);
// const tasksWithImages = ref([]);


// const loadTasks = async () => {
//   console.log('Load Tasks button clicked');
//   const fetchedTasks = await fetchLimitedTasks();
//   if (fetchedTasks) {
//     tasks.value = fetchedTasks;
//     console.log('Tasks loaded:', fetchedTasks);
//   }
// };
// //legacy function
// const loadImages = async () => {
//   console.log('Load Images button clicked');
//   const fetchedTasks = await fetchImages();
//   if (fetchedTasks) {
//     tasksWithImages.value = fetchedTasks;
//     console.log('Tasks with images loaded:', fetchedTasks);
//   }
// };

// //
</script>

<template>
  <div class="mainContainer">
    <div class="titleContainer">
      <h1> Odyssey Echoes </h1>
    </div>
    
    <div class="buttonContainer">
      <button class="main-button" @click="goToLogin"> Login </button>
      <button class="main-button" @click="goToAbout"> About </button>
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.titleContainer {
  border: 2px solid white;
  border-radius: 50px;
  padding: 1px 30px; /* Reduced top and bottom padding */
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.233);
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.titleContainer h1 {
  font-size: 5em; /* Increased font size for title */
  color: #EF476F;
  text-shadow: 6px 2px 4px rgba(0, 0, 0, 2); /* Medium shadow */
}

.main-button {
  background-color: #118AB2;
  color: #FFD166;
  border: none;
  border-radius: 15px;
  padding: 15px 20px; /* Adjusted padding */
  font-size: 25px;
  font-weight: bold;
  margin: 10px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  width: 250px;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}

.main-button:hover {
  background-color: #EF476F;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.9);
}

.main-button:last-child {
  margin-bottom: 0;
}
</style>