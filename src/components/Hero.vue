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
    <div class="content">
      <div class="profile-container">
        <img src="/propic.webp" alt="Andrea Galliani" class="profile-img" />
      </div>
      
      <h2 class="greeting">Hi, I'm Andrea Galliani</h2>
      <h1 class="title">Bridging <span class="silicon">Silicon</span> and <span class="code">Code</span></h1>
      
      <p class="subtitle">
        I turn complex IC designs into seamless digital experiences.
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
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
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
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
  transition: transform 0.3s ease;
}

.profile-img:hover {
  transform: scale(1.05);
  border-color: var(--color-accent-code);
}

.greeting {
  font-size: 1.5rem;
  color: var(--color-accent-code);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.silicon { color: var(--color-accent-silicon); }
.code { color: var(--color-accent-code); }

.subtitle {
  font-size: 1.25rem;
  color: var(--color-accent-tools);
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-btn {
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--glass-border);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-accent-code);
  color: var(--color-accent-code);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .title { font-size: 2.5rem; }
  .profile-img { width: 150px; height: 150px; }
}
</style>
