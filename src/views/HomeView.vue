<script setup>
import { ref } from 'vue';
import { fetchLimitedTasks } from '@/utils/fetchTasks';
import { fetchImages } from '@/utils/fetchImages';

const tasks = ref([]);
const tasksWithImages = ref([]);

const loadTasks = async () => {
  console.log('Load Tasks button clicked');
  const fetchedTasks = await fetchLimitedTasks();
  if (fetchedTasks) {
    tasks.value = fetchedTasks;
    console.log('Tasks loaded:', fetchedTasks);
  }
};

const loadImages = async () => {
  console.log('Load Images button clicked');
  const fetchedTasks = await fetchImages();
  if (fetchedTasks) {
    tasksWithImages.value = fetchedTasks;
    console.log('Tasks with images loaded:', fetchedTasks);
  }
};
</script>

<template>
  <h1> Hello There Page </h1>
  <p> Hello There I am the hello there page </p>
  <div>    
    <button @click="loadTasks">Load Tasks Testing</button>
    <button @click="loadImages">Load Images</button>
    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.name }}</li>
      <li v-for="imageTask in tasksWithImages" :key="imageTask.id">{{ imageTask.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
</style>