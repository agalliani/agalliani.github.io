<script setup lang="ts">
</script>

<template>
  <section class="about">
    <div class="container">
      <div class="content-grid">
        <div class="text-column">
          <h2>About Me</h2>
          <p class="lead">
            I thrive at the intersection of hardware and software.
          </p>
          <p>
            With hands-on experience in analog & mixed-signal IC design and a strong background in full-stack development, I simplify the bridge between silicon and systems. I create solutions that are not only technically robust but also practical and scalable.
          </p>
          <p>
            Working with me means gaining a collaborator who understands both the chip and the code, delivering value faster and smarter.
          </p>
        </div>
        <div class="visual-column">
          <div class="abstract-shape"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding: 6rem 2rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--glass-border);
  border-bottom: 1px solid var(--glass-border);
  position: relative;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

h2 {
  font-size: 2.5rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--color-accent-silicon);
  border-radius: 2px;
}

.lead {
  font-size: 1.25rem;
  color: var(--color-accent-code);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-accent-tools);
  margin-bottom: 1.5rem;
}

.visual-column {
  display: flex;
  justify-content: center;
  align-items: center;
}

.abstract-shape {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(20, 184, 166, 0.1));
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  position: relative;
  transform: rotate(45deg);
  box-shadow: 0 0 50px rgba(0,0,0,0.2);
}

.abstract-shape::before {
  content: '';
  position: absolute;
  inset: 20px;
  border: 1px solid var(--color-accent-silicon);
  opacity: 0.3;
  border-radius: 10px;
}

.abstract-shape::after {
  content: '';
  position: absolute;
  inset: 40px;
  border: 1px solid var(--color-accent-code);
  opacity: 0.3;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .visual-column {
    order: -1;
  }
  
  .abstract-shape {
    width: 200px;
    height: 200px;
  }
}
</style>
