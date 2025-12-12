<script setup lang="ts">
const skills = {
  silicon: ['Analog IC Design', 'Mixed-Signal', 'CMOS Technology', 'Cadence Virtuoso', 'Verilog-A', 'Physical Layout'],
  code: ['Python', 'TypeScript', 'Vue.js', 'C++', 'Node.js', 'Full-Stack Dev'],
  tools: ['Git & GitHub', 'Docker', 'Linux / Bash', 'CI/CD Pipelines', 'Altium Designer', 'Matlab']
}
</script>

<template>
  <section class="skills">
    <div class="container">
      <h2>Technical Arsenal</h2>
      
      <div class="grid">
        <!-- Silicon Category -->
        <div class="category-card silicon-card">
          <h3 class="silicon-text">Silicon</h3>
          <div class="tags">
            <span v-for="skill in skills.silicon" :key="skill" class="tag silicon-tag">{{ skill }}</span>
          </div>
        </div>
        
        <!-- Code Category -->
        <div class="category-card code-card">
          <h3 class="code-text">Code</h3>
          <div class="tags">
            <span v-for="skill in skills.code" :key="skill" class="tag code-tag">{{ skill }}</span>
          </div>
        </div>
        
        <!-- Tools Category -->
        <div class="category-card tools-card">
          <h3 class="tools-text">Tools</h3>
          <div class="tags">
            <span v-for="skill in skills.tools" :key="skill" class="tag tools-tag">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  padding: 6rem 2rem;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 4rem;
  text-align: center;
  color: var(--color-text);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.category-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.04);
}

.silicon-card:hover { border-color: var(--color-accent-silicon); box-shadow: 0 10px 30px rgba(245, 158, 11, 0.1); }
.code-card:hover { border-color: var(--color-accent-code); box-shadow: 0 10px 30px rgba(20, 184, 166, 0.1); }
.tools-card:hover { border-color: var(--color-accent-tools); box-shadow: 0 10px 30px rgba(148, 163, 184, 0.1); }

.category-card h3 {
  font-family: var(--font-mono);
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 1px solid var(--glass-border);
  padding-bottom: 1rem;
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
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: var(--font-mono);
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: default;
}

.silicon-tag { color: var(--color-accent-silicon); border-color: rgba(245, 158, 11, 0.2); }
.code-tag { color: var(--color-accent-code); border-color: rgba(20, 184, 166, 0.2); }
.tools-tag { color: var(--color-accent-tools); border-color: rgba(148, 163, 184, 0.2); }

.silicon-tag:hover { background: rgba(245, 158, 11, 0.1); }
.code-tag:hover { background: rgba(20, 184, 166, 0.1); }
.tools-tag:hover { background: rgba(148, 163, 184, 0.1); }
</style>
