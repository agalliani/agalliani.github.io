<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Publications from './components/Publications.vue'
import Skills from './components/Skills.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  <main class="w-full overflow-x-hidden">
    <div id="hero"><Hero /></div>
    <div id="about"><About /></div>
    <div id="projects"><Projects /></div>
    <div id="publications"><Publications /></div>
    <div id="skills"><Skills /></div>
  </main>
  <div id="footer"><Footer /></div>
</template>

