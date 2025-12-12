<script setup lang="ts">
</script>

<template>
  <section class="about">
    <div class="container">
      <h2>About Me</h2>
      <p>
        I thrive at the intersection of hardware and software. My work bridges the gap between analog circuit design and modern software engineering, creating tools that make complex systems accessible and efficient.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 4rem 2rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
}
</style>
