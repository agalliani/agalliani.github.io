<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="socials">
        <a href="https://github.com/agalliani" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/andreagalliani" target="_blank" rel="noopener">LinkedIn</a>
        <a href="mailto:andreagalliani29@gmail.com">Email</a>
      </div>
      <p class="copyright">© {{ year }} Andrea Galliani. Built with Vue 3 & Vite.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 3rem 2rem;
  border-top: 1px solid var(--glass-border);
  margin-top: 4rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.socials {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.socials a {
  font-family: var(--font-mono);
  color: var(--color-accent-tools);
  font-size: 0.9rem;
}

.socials a:hover {
  color: var(--color-accent-code);
}

.copyright {
  color: var(--color-accent-tools);
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
