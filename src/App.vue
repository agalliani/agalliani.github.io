<script setup lang="ts">

</script>

<template>
  <header>

    <img class="profile-picture" src="/propic.webp" alt="Profile Picture" />
    <h1>Andrea Galliani</h1>
    <!--p>Computer Engineer | Ph.D. Student | Research Fellow</p-->
    <ul class="skills-list">
      <li>🔬 Research in Microelectronics</li>
      <li>💻 Web, Embedded Systems & Circuit Design</li>
      <li>👨‍💻 Programming: Python, TypeScript, C++</li>
    </ul>
  </header>



  <section>
    <h2>About Me</h2>
    <p>
      I'm a Computer Engineer passionate about designing cutting-edge CMOS Integrated Circuits and embedded
      systems. My research focuses on developing innovative solutions for high-energy particle detectors,
      contributing to advancements in particle physics.
    </p>
    <p>
      During my PhD at the University of Bergamo, I am developing and characterizing front-end circuits in 28nm
      CMOS technology, significantly improving detector performance. I have a strong interest in the interface
      between hardware and software, and I am gaining solid experience in programming microcontrollers.
    </p>
  </section>
  <section>
    <h2>Oxymeter Project</h2>
    <p>
      I'm the creator of Oxymeter, a project that won third place at Startcup Bergamo 2024. <br /> Oxymeter is a
      cutting-edge environmental monitoring device designed to measure altitude and oxygen availability, tailored
      for high-altitude sports enthusiasts and researchers.
      <br />You can learn more about the StartCup competition <a
        href="https://www.unibg.it/ateneo/chi-siamo/grandi-eventi/start-cup-2024" target="_blank">here</a>.
    </p>
    <p>
      <a href="https://agalliani.github.io/frontend-oxymeter/#/" target="_blank">
        <button>Visit OXYMETER</button></a>
    </p>
  </section>
  <section>
    <h2>Current Work</h2>
    <p>
      I am working as a Graduate Research Fellow at the Università degli Studi di Bergamo,
      in the context of the Progetti di Rilevante Interesse Nazionale (PRIN). In this role, my responsibilities
      include
      the development and characterization of front-end circuits in 28 nm CMOS technology for pixel detectors in
      future high-energy
      physics accelerators and advanced x-ray imaging instrumentation.
    </p>
    <h2>Past Experience</h2>
    <p>
      I worked as Research Fellow at the National Institute for Nuclear Physics (INFN),
      section of Pavia, working on the Falaphel project. In this role, my responsibilities include
      the design, test, and characterization of front-end circuits for the next generation of High
      Energy Physics pixel detectors.
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

  <!--section>
			<h2>Read my medium stories</h2>
			<div
				id="retainable-rss-embed"
				data-rss="https://medium.com/feed/@agalliani"
				data-maxcols="3"
				data-layout="slider"
				data-poststyle="modal"
				data-readmore="Read more..."
				data-buttonclass="btn btn-primary"
				data-offset="-100"
			></div>
		</section-->
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
      <a href="https://orcid.org/my-orcid?orcid=0000-0001-8606-5689" target="_blank"> ORCID </a>
    </p>

    <p>andreagalliani29 <strong>[at]</strong> gmail <strong>[dot]</strong> com</p>
  </footer>
</template>

<style scoped>


/* Header styles */
header {
    background-color: #2c3e50; /* Blu scuro elegante */
    color: #fff;
    text-align: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

/* Profile picture styles */
.profile-picture {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    margin-bottom: 10px;
    border-color: #fff;
    border-style: solid;
    border-width: 3px;
}

/* Skills list styles */
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


/* Title styles */
h1 {
    margin: 0;
    font-size: 2.5em;
    color: #fff;
}

  /* Button styles */
  button {
    background-color: #3498db; /* Blu acceso per i bottoni */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
   }
   
   button:hover {
    background-color: #2980b9; /* Blu più scuro al passaggio del mouse */
   }
/* Section styles */
section {
    padding: 20px;
    background-color: #fff;
    margin: 20px auto;
    border-radius: 8px; /* Bordi più arrotondati */
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15); /* Ombreggiatura leggera */
    max-width: 1200px;
    width: 90%; /* Adatta il layout agli schermi più grandi */
}

/* Text styles */
p {
    font-size: 1.2em;
    line-height: 1.6;
}

/* Link styles */
a {
    text-decoration: none;
    color: #3498db; /* Colore blu per i link */
    transition: all 0.3s ease-in-out;
}

a:hover {
    text-decoration: underline;
    color: #1e608e; /* Un blu leggermente più scuro */
}

/* Footer styles */
footer {
    background-color: #2c3e50; /* Blu scuro, in linea con l'header */
    color: #fff;
    text-align: center;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

/* Footer links styles */
footer a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    transition: all 0.3s ease-in-out;
}

footer a:hover {
    color: #3498db; /* Blu per hover sui link nel footer */
}

/* Footer separator styles */
footer .separator::before {
    content: "|";
    margin: 0 5px;
}

/* Custom styles for sections or other elements can be added below */

/* Responsività per mobile */
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

    /*section {
        margin: 10px;
        padding: 15px;
    }*/

    p {
        font-size: 1em;
    }

    button {
        font-size: 14px;
        padding: 8px 16px;
    }
}

</style>
