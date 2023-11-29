<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};
</script>

<template>
    <div class="pContainer">
        <h1>About Odyssey Echoes - Your Personal Travel Diary</h1>
        <h3>Welcome to Odyssey Echoes!</h3>
        <p>Odyssey Echoes is more than just a travel diary application; it's a portal to relive your most cherished travel memories and experiences. We believe that every journey is a unique story waiting to be told, and our platform is designed to help you do just that. By blending technology with the timeless charm of storytelling, we offer a space where your adventures come to life.</p>
        <h3>How It Works</h3>
        <p>•Create and Edit Travel Entries: Document every detail of your travels with ease. Whether it’s a quaint café in Paris or the serene beaches of Bali, every entry is a new chapter in your travel story.</p>
        <p>•Upload Photos: They say a picture is worth a thousand words. With our seamless photo upload feature, enrich your travel tales with vibrant images.</p>
        <h3>Our Journey</h3>
        <p>Founded by a group of travel enthusiasts and tech aficionados, Odyssey Echoes started as a dream to encapsulate the essence of travel. We realized that while journeying is about exploring new places, it's also about preserving those memories. Thus, Odyssey Echoes was born - a fusion of our love for travel and technology.</p>
        
    </div>
    <button class="main-button" @click="goToHome">Home</button>
  </template>


<style scoped>
.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pContainer {
  border: 2px solid white;
  border-radius: 50px;
  padding: 10px 40px; /* Reduced top and bottom padding */
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.776);
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