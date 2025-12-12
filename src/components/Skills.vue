<script setup lang="ts">
const skills = {
  silicon: ['Analog Design', 'Mixed-Signal', 'Cadence Virtuoso', 'Verilog-A'],
  code: ['Python', 'TypeScript', 'Vue.js', 'C++'],
  tools: ['Git', 'Linux', 'Docker', 'CI/CD']
}
</script>

<template>
  <section class="skills">
    <div class="container">
      <h2>Technical Arsenal</h2>
      
      <div class="grid">
        <div class="category">
          <h3 class="silicon-text">Silicon</h3>
          <div class="tags">
            <span v-for="skill in skills.silicon" :key="skill" class="tag silicon-border">{{ skill }}</span>
          </div>
        </div>
        
        <div class="category">
          <h3 class="code-text">Code</h3>
          <div class="tags">
            <span v-for="skill in skills.code" :key="skill" class="tag code-border">{{ skill }}</span>
          </div>
        </div>
        
        <div class="category">
          <h3 class="tools-text">Tools</h3>
          <div class="tags">
            <span v-for="skill in skills.tools" :key="skill" class="tag tools-border">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding: 4rem 2rem;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.category h3 {
  font-family: var(--font-mono);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.silicon-text { color: var(--color-accent-silicon); }
.code-text { color: var(--color-accent-code); }
.tools-text { color: var(--color-accent-tools); }

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tag {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.silicon-border:hover { border-color: var(--color-accent-silicon); color: var(--color-accent-silicon); }
.code-border:hover { border-color: var(--color-accent-code); color: var(--color-accent-code); }
.tools-border:hover { border-color: var(--color-accent-tools); color: var(--color-accent-tools); }
</style>
