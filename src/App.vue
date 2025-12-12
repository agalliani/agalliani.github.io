<script setup lang="ts">

</script>

<template>
<header>
  <img class="profile-picture" src="/propic.webp" alt="Profile Picture" />
  <h1>Andrea Galliani</h1>
  <ul class="skills-list">
    <li>🔬 Analog & Mixed-Signal IC Design</li>
    <li>💻 Backend & Full-Stack Software Development</li>
    <li>🖥️ Programming: Python, TypeScript, C++</li>
    <li>⚡ Embedded Systems & Automation</li>
  </ul>
</header>



  <section>
  <h2>About Me</h2>
  <p>
    I'm a PhD candidate in Engineering and Applied Science with a strong background in analog and mixed-signal IC design for high-energy physics detectors.
    Alongside my research, I develop software solutions for data acquisition, workflow automation, and full-stack systems using Python, TypeScript, and modern frameworks.
  </p>
  <p>
    My work bridges hardware and software: designing complex CMOS circuits while creating scalable, maintainable software solutions. 
    I am passionate about solving challenging engineering problems, simplifying processes, and delivering impactful results.
  </p>
</section>

  <section>
  <h2>Current Work</h2>
   <p>
    I work as an AMS Engineer at Bosch Sensortec in Milan, focusing on mixed-signal integrated circuits for next-generation sensing technologies. My role bridges analog and digital domains: I verify system-level compatibility, run chip-level simulations, and identify design inconsistencies early in the development flow. I collaborate with cross-disciplinary teams to ensure robust, reliable, and high-performance sensor solutions.
  </p>
  <br>
 
  <h2>Past Experience</h2>
   <p>
    I have been a Research Fellow at the University of Bergamo, working on the development and characterization of front-end circuits in 28 nm CMOS technology for pixel detectors.
    In parallel, I developed software tools and automation scripts for testing, data acquisition, and analysis, bridging hardware design and software solutions.
  </p>
  <br>
  <p>
    I previously worked as a Research Fellow at INFN Pavia on the Falaphel project, focusing on front-end circuits for high-energy physics detectors.
    I also developed software applications for data collection, analysis, and visualization, gaining hands-on experience in Python, Tkinter, and workflow automation.
  </p>
</section>
<section>
    <h2>Scientific and Academic Curriculum</h2>
    <p>
      <a href="/scientific_academic_cv_eng.pdf" target="_blank" download>
        <i class="fa-solid fa-file-pdf"></i> Download CV (ENG)
      </a>
    </p>
  </section>

  <footer>
    <p>
      <a href="https://www.linkedin.com/in/andreagalliani" target="_blank"> Linkedin </a>
      <span class="separator"></span>
      <a href="https://medium.com/@agalliani" target="_blank"> Medium </a>
      <span class="separator"></span>
      <a href="https://github.com/agalliani"> GitHub </a>
      <span class="separator"></span>
      <a href="https://www.researchgate.net/profile/Andrea-Galliani-3" target="_blank">
        ResearchGate
      </a>
      <span class="separator"></span>
      <a href="https://www.scopus.com/authid/detail.uri?authorId=57936566700" target="_blank">
        Scopus
      </a>
      <span class="separator"></span>
      <a href="https://scholar.google.com/citations?user=mReBtJQAAAAJ&hl=it" target="_blank">
        Google Scholar
      </a>
      <span class="separator"></span>
      <a href="https://orcid.org/0000-0001-8606-5689" target="_blank"> ORCID </a>
    </p>

    <p>andreagalliani29 <strong>[at]</strong> gmail <strong>[dot]</strong> com</p>
  </footer>
</template>

<style scoped>
/* Header styles */
header {
    background-color: #2c3e50;
    color: #fff;
    text-align: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-picture {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    margin-bottom: 10px;
    border-color: #fff;
    border-style: solid;
    border-width: 3px;
}

.skills-list {
    list-style-type: none;
    padding: 0;
    margin: 20px 0 0;
    font-size: 1em;
    line-height: 1.6;
    text-align: center;
}

.skills-list li {
    margin: 5px 0;
}

h1 {
    margin: 0;
    font-size: 2.5em;
    color: #fff;
}

button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #2980b9;
}

section {
    padding: 20px;
    background-color: #fff;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
    max-width: 1200px;
    width: 90%;
}

p {
    font-size: 1.2em;
    line-height: 1.6;
}

a {
    text-decoration: none;
    color: #3498db;
    transition: all 0.3s ease-in-out;
}

a:hover {
    text-decoration: underline;
    color: #1e608e;
}

footer {
    background-color: #2c3e50;
    color: #fff;
    text-align: center;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

footer a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    transition: all 0.3s ease-in-out;
}

footer a:hover {
    color: #3498db;
}

footer .separator::before {
    content: "|";
    margin: 0 5px;
}

@media (max-width: 768px) {
    header {
        padding: 10px;
    }

    h1 {
        font-size: 1.8em;
    }

    .profile-picture {
        width: 150px;
        height: 150px;
    }

    p {
        font-size: 1em;
    }

    button {
        font-size: 14px;
        padding: 8px 16px;
    }
}
</style>
