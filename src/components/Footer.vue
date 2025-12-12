<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/Andrea-Galliani-3' },
  { name: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=57936566700' },
  { name: 'ORCID', url: 'https://orcid.org/0000-0001-8606-5689' },
  { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=mReBtJQAAAAJ&hl=it' }
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="academic-links">
        <a v-for="link in links" :key="link.name" :href="link.url" target="_blank" rel="noopener">{{ link.name }}</a>
      </div>
      
      <div class="contact">
        <a href="mailto:andreagalliani29@gmail.com" class="email">andreagalliani29 [at] gmail [dot] com</a>
      </div>

      <p class="copyright">© {{ year }} Andrea Galliani. Built with Vue 3 & Vite.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 4rem 2rem;
  border-top: 1px solid var(--glass-border);
  margin-top: 4rem;
  background: rgba(15, 23, 42, 0.5);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.academic-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.academic-links a {
  color: var(--color-accent-tools);
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.academic-links a:hover {
  color: var(--color-accent-silicon);
  text-decoration: underline;
}

.contact {
  margin-bottom: 2rem;
}

.email {
  font-family: var(--font-mono);
  color: var(--color-text);
  font-size: 1rem;
}

.email:hover {
  color: var(--color-accent-code);
}

.copyright {
  color: var(--color-accent-tools);
  font-size: 0.8rem;
  opacity: 0.6;
}
</style>
