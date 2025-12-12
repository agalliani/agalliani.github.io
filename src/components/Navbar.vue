<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="logo" @click="scrollToSection('hero')">AG.</div>
      <div class="links">
        <button @click="scrollToSection('about')">About</button>
        <button @click="scrollToSection('skills')">Skills</button>
        <button @click="scrollToSection('footer')">Contact</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  z-index: 100;
  transition: all 0.3s ease;
}

.navbar.scrolled {
  padding: 1rem 2rem;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--glass-border);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--color-text);
  cursor: pointer;
  letter-spacing: -0.05em;
}

.logo:hover {
  color: var(--color-accent-code);
}

.links {
  display: flex;
  gap: 2rem;
}

button {
  background: none;
  border: none;
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s ease;
}

button:hover {
  opacity: 1;
  color: var(--color-accent-silicon);
}
</style>
