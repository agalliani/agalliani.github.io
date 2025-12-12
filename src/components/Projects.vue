<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'

const projects = [
  {
    title: 'FALAPHEL: Silicon Photonics Readout',
    subtitle: '28nm CMOS Drivers & TIA for High-Rate Physics',
    description: 'Designed and characterized Mixed-Signal ICs in <strong>TSMC 28nm</strong> technology for Silicon Photonics integration in High Energy Physics detectors.<br><br><span class="text-slate-300">Key Responsibilities:</span> Full-custom design (Schematic/Layout) of analog front-ends and modulator drivers. Designed the PCB test setup and performed post-silicon validation.',
    tech: ['TSMC 28nm', 'Silicon Photonics', 'Cadence Virtuoso', 'PCB Design', 'Lab Testing'],
    links: [
      { label: 'Project Overview (PDF)', url: 'https://agenda.infn.it/event/23453/contributions/117451/attachments/73991/93910/Falaphel.pdf' },
      { label: 'Technical Specifications (PDF)', url: 'https://agenda.infn.it/event/27087/contributions/137028/attachments/82129/107840/spec_v02.pdf' }
    ],
    icon: 'fas fa-microchip'
  },
  {
    title: 'Oxymeter | Sports Tech Venture',
    subtitle: '3rd Place Winner @ StartCup Bergamo 2024',
    description: 'Founded a sports-tech project originally designed as an IoT wearable. Successfully pitched the business case, winning a €2.5k grant.<br><br><span class="text-slate-300">The Pivot:</span> Led the technical transition from a hardware prototype to a scalable <strong>Vue.js Web App</strong> MVP to prioritize market validation over manufacturing complexity.',
    tech: ['Vue.js', 'IoT Prototyping', 'Business Strategy', 'Product Design'],
    link: 'https://agalliani.github.io/frontend-oxymeter/#/',
    linkLabel: 'Try Live App',
    icon: 'fas fa-heart-pulse',
    badge: '🏆 Award Winner'
  },
  {
    title: 'Bosch Challenge Winner | Edge AI',
    subtitle: 'IoT Predictive Maintenance System',
    description: 'Winner of the "Bosch Sensortec Making Sensor Tec!" competition. Designed an end-to-end IoT solution for domestic boiler predictive maintenance.<br><br><span class="text-slate-300">Tech & Results:</span> Utilized <strong>Nicla Sense ME</strong> sensors and <strong>Bosch AI Studio</strong> to train Neural Networks on real-world exhaust gas data. Achieved <strong>99.58% accuracy</strong> in detecting equipment aging.',
    tech: ['Edge AI', 'Bosch Sensortec', 'Neural Networks', 'IoT Architecture', 'Data Analysis'],
    link: 'https://www.bosch-press.it/pressportal/it/it/press-release-63680.html',
    linkLabel: 'Read Press Release',
    links: [
      { label: 'View Official LinkedIn Post 🔗', url: 'https://www.linkedin.com/posts/bosch-italia_sensingsolutions-sensational-boschitalia-activity-7084804184545345537-wJKk' }
    ],
    icon: 'fas fa-medal',
    badge: '🥇 1st Place Winner'
  },
  {
    title: 'Smart Fistula Monitor | MedTech',
    subtitle: 'Wearable for Hemodialysis Patients',
    description: 'Developed a non-invasive wearable device to monitor arteriovenous fistulas in hemodialysis patients. Implemented acoustic sensing algorithms using embedded microphones to detect pathological variations, bridging the gap between clinical needs and embedded electronics.<br><br><span class="text-slate-300">Context:</span> Collaboration with <strong>Mario Negri Institute</strong> & UniBG. Awarded by <strong>Fondazione Cariplo</strong> (InnovaWelfare 2025).',
    tech: ['Embedded Audio', 'Medical IoT', 'Signal Processing', 'Prototyping'],
    icon: 'fas fa-stethoscope',
    badge: 'Funded Project'
  },
  {
    title: 'Smart Gas Meter Firmware | Pietro Fiorentini',
    subtitle: 'Anti-Seismic Safety Algorithms',
    description: 'Developed and optimized embedded firmware algorithms for next-gen smart gas meters. The core task involved implementing <strong>real-time seismic detection</strong>: analyzing accelerometer data to automatically shut off gas flow during earthquake events, ensuring public safety and infrastructure integrity.<br><br><span class="text-slate-300">Context:</span> R&D Contract (BELLFIOR22) for <strong>Pietro Fiorentini S.p.A.</strong>.',
    tech: ['Embedded C', 'Real-Time Systems', 'Signal Processing', 'Safety Critical', 'Industrial R&D'],
    icon: 'fas fa-shield-halved'
  },
  {
    title: 'Falaphel-3 DAQ Framework',
    subtitle: 'Automated Characterization for TOT Readout',
    description: 'Engineered the full-stack Data Acquisition (DAQ) system for 28nm CMOS chip characterization. Developed Python/C++ drivers to interface with FPGA readout boards and lab instruments, enabling automated <strong>Time-Over-Threshold (TOT)</strong> linearity measurements and noise analysis.',
    tech: ['Python', 'Automated Testing', 'Hardware Interfacing', 'Data Analysis', 'Git'],
    link: 'https://github.com/agalliani/falaphel3-daq',
    linkLabel: 'View Code on GitHub',
    icon: 'fas fa-terminal'
  },
  {
    title: 'MangroviaIoT Platform',
    subtitle: 'Developer & SRE',
    description: 'Core Developer for a microservices-based IoT platform focused on Asset & Energy Management. Optimized critical frontend modules (Angular) for real-time data visualization dashboards. Full-stack feature implementation ensure high availability for industrial clients.',
    tech: ['Vue.js', 'Angular', 'Microservices', 'SRE', 'Industrial IoT'],
    link: 'https://mangroviaiot.com/',
    linkLabel: 'Visit Platform',
    icon: 'fas fa-server'
  }
]
</script>

<template>
  <section class="py-24 px-6 bg-slate-900 relative">
    <div class="container mx-auto max-w-6xl">
      <div class="mb-16">
        <h2 class="text-4xl font-bold text-slate-200 mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-16 after:h-1 after:bg-amber-500 after:rounded-full">
          Selected Projects
        </h2>
        <p class="text-slate-400 mt-6 max-w-2xl text-lg">
          A collection of my work in microelectronics, embedded systems, and software development.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard 
          v-for="project in projects" 
          :key="project.title"
          v-bind="project"
        />
      </div>
    </div>
  </section>
</template>
