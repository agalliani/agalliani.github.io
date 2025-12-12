<script setup lang="ts">
const socials = [
  { name: 'GitHub', url: 'https://github.com/agalliani', icon: 'fab fa-github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/andreagalliani', icon: 'fab fa-linkedin' },
  { name: 'Scholar', url: 'https://scholar.google.com/citations?user=mReBtJQAAAAJ&hl=it', icon: 'fas fa-graduation-cap' },
  { name: 'Medium', url: 'https://medium.com/@agalliani', icon: 'fab fa-medium' },
]
</script>

<template>
  <section class="hero">
    <div class="background-pattern"></div>
    <div class="content fade-in-up">
      <div class="profile-container">
        <img src="/propic.webp" alt="Andrea Galliani" class="profile-img" />
      </div>
      
      <h2 class="greeting">Hi, I'm Andrea Galliani</h2>
      <h1 class="title">Bridging <span class="silicon">Silicon</span> and <span class="code">Code</span>.</h1>
      
      <p class="subtitle">
        I turn complex IC designs into seamless digital experiences. From analog circuits to full-stack automation, I connect hardware and software to deliver real impact.
      </p>

      <div class="social-links">
        <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" class="social-btn">
          {{ social.name }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: -1;
  opacity: 0.5;
}

.content {
  z-index: 1;
  max-width: 900px;
}

.fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-container {
  margin-bottom: 2rem;
}

.profile-img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-accent-silicon);
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-img:hover {
  transform: scale(1.05);
  border-color: var(--color-accent-code);
  box-shadow: 0 0 40px rgba(20, 184, 166, 0.2);
}

.greeting {
  font-size: 1.5rem;
  color: var(--color-accent-code);
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-family: var(--font-mono);
}

.title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.silicon { color: var(--color-accent-silicon); }
.code { color: var(--color-accent-code); }

.subtitle {
  font-size: 1.35rem;
  color: var(--color-accent-tools);
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-btn {
  padding: 0.7rem 1.5rem;
  border: 1px solid var(--glass-border);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.95rem;
  font-weight: 500;
  font-family: var(--font-mono);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-accent-code);
  color: var(--color-accent-code);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .title { font-size: 2.8rem; }
  .profile-img { width: 140px; height: 140px; }
  .subtitle { font-size: 1.1rem; }
}
</style>
