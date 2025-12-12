<script setup lang="ts">
</script>

<template>
  <section class="hero">
    <div class="content">
      <h1 class="title">Bridging <span class="silicon">Silicon</span> and <span class="code">Code</span></h1>
      <p class="subtitle">
        I turn complex IC designs into seamless digital experiences.
      </p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.silicon {
  color: var(--color-accent-silicon);
}

.code {
  color: var(--color-accent-code);
}

.subtitle {
  font-size: 1.5rem;
  color: var(--color-accent-tools);
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  .subtitle {
    font-size: 1.2rem;
  }
}
</style>
