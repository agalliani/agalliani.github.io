<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'

// VITE GLOB IMPORT: Automatically load all images from src/assets/images
// Using absolute path pattern to ensure robust matching across environments
const globImages = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP,mp4,webm,mov,MP4,WEBM,MOV}', { 
  eager: true, 
  query: '?url',
  import: 'default' 
})

// Helper to filter images by partial path (e.g. 'deep-tech/pihex' or just 'pihex')
const getGallery = (pathSegment?: string) => {
  if (!pathSegment) return undefined
  
  return Object.keys(globImages)
    // Filter paths containing the segment (e.g. /src/assets/images/deep-tech/pihex/foo.jpg)
    .filter(path => path.includes(`/${pathSegment}/`)) 
    .sort() // Sort alphabetically to maintain order
    .map(path => globImages[path] as string)
}

// Explicit imports for hero images to ensure they are bundled correctly
import dalilaHero from '@/assets/images/web-apps/dalila-portfolio-hero.png'
import timelineMeHero from '@/assets/images/web-apps/timeline-me-hero.png'
import oxymeterHero from '@/assets/images/web-apps/oxymeter-hero.png'


const webApps = [
  {
    title: 'Dalila Scollo | Performer & Vocal Coach',
    subtitle: 'Soprano, Dancer & Creative Coach',
    description: 'Official website of Dalila Scollo, a multi-disciplinary artist and <strong>Soprano (F3-G5)</strong>. The platform showcases her career in <strong>Musical Theatre</strong> and <strong>Commercial Dance</strong>, featuring a rich media gallery of her performances and details on her <strong>Vocal Coaching</strong> methodology.',
    tech: ['Vue.js', 'Tailwind CSS', 'Audio/Video Gallery', 'Responsive'],
    link: 'https://dalilascollo.com/',
    linkLabel: 'Visit Website',
    icon: 'fas fa-microphone-lines',
    badge: '✨ Featured Design',
    image: dalilaHero
  },
  {
    title: 'Timeline Me',
    subtitle: 'Instant Timeline Generator',
    description: 'A productivity tool for developers and PMs. Create visual, exportable timelines in seconds. Features an intuitive form interface, custom themes, and high-quality image export.<br><br><strong>Why it exists:</strong> To solve the pain of creating timeline graphics for documentation and presentations manually.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Shadcn UI'],
    link: 'https://agalliani.github.io/timeline-me/', 
    linkLabel: 'Launch App 🚀', 
    //links: [
    //   { label: 'View Source', url: 'https://github.com/agalliani/timeline-me' }
    // ],
    badge: 'In Progress',
    icon: 'fas fa-stream',
    image: timelineMeHero
  },
  {
    title: 'Oxymeter | Sports Tech',
    subtitle: 'IoT Device Companion App',
    description: 'A scalable <strong>Vue.js Web App</strong> designed to interface with wearable IoT devices. Features real-time data visualization and session management.<br><br><span class="text-slate-300">The Pivot:</span> Transformed a hardware-heavy prototype into a software-first solution to prioritize market validation.',
    tech: ['Vue.js', 'Vite', 'IoT Integration', 'UX Design'],
    link: 'https://agalliani.github.io/frontend-oxymeter/#/',
    linkLabel: 'Launch App 🚀',
    icon: 'fas fa-heart-pulse',
    badge: '🏆 Award Winner',
    image: oxymeterHero
  }
]

const deepTech = [
  {
    title: 'PiHEX | PRIN 2022',
    subtitle: '28nm CMOS for HL-LHC & X-Ray Imaging',
    description: 'Project aimed at advancing electronic instrumentation for <strong>High Luminosity Accelerators (HL-LHC)</strong> and next-gen <strong>Free Electron Lasers</strong>. Designed prototype chips integrating readout channel matrices with <strong>ultra-fine pitch (<100 µm)</strong> in 28nm CMOS technology. Pushing the limits of spatial resolution and readout speed for future particle physics experiments.<br><br><span class="text-slate-300">Context:</span> Funded by the Italian Ministry of University and Research (MUR) - PRIN 2022 Program.',
    tech: ['PRIN 2022', '28nm CMOS', 'Pixel Detectors', 'HL-LHC', 'X-Ray Imaging'],
    links: [
      { label: 'Project Presentation (Unipd)', url: 'https://www.dei.unipd.it/system/files/PRIN2022_PiHEX_Gerardin_0.pdf' },
      { label: 'CERN Indico Contribution', url: 'https://indico.cern.ch/event/1428808/contributions/6505566/contribution.pdf' }
    ],
    icon: 'fas fa-atom',
    badge: '🏛️ MUR Grant',
    gallery: getGallery('deep-tech/pihex')
  },
  {
    title: 'FALAPHEL: Silicon Photonics Readout',
    subtitle: '28nm CMOS Drivers & TIA for High-Rate Physics',
    description: 'Designed and characterized Mixed-Signal ICs in <strong>TSMC 28nm</strong> technology for Silicon Photonics integration in High Energy Physics detectors.<br><br><span class="text-slate-300">Key Responsibilities:</span> Full-custom design (Schematic/Layout) of analog front-ends and modulator drivers. Designed the PCB test setup and performed post-silicon validation.',
    tech: ['TSMC 28nm', 'Silicon Photonics', 'Cadence Virtuoso', 'PCB Design', 'Lab Testing'],
    links: [
      { label: 'Project Overview (PDF)', url: 'https://agenda.infn.it/event/23453/contributions/117451/attachments/73991/93910/Falaphel.pdf' },
      { label: 'Technical Specifications (PDF)', url: 'https://agenda.infn.it/event/27087/contributions/137028/attachments/82129/107840/spec_v02.pdf' }
    ],
    icon: 'fas fa-microchip',
    gallery: getGallery('deep-tech/falaphel')
  },
  {
    title: 'Falaphel-3 DAQ Framework',
    subtitle: 'Automated Characterization for TOT Readout',
    description: 'Engineered the full-stack Data Acquisition (DAQ) system for 28nm CMOS chip characterization. Developed Python/C++ drivers to interface with FPGA readout boards and lab instruments, enabling automated <strong>Time-Over-Threshold (TOT)</strong> linearity measurements and noise analysis.',
    tech: ['Python', 'Automated Testing', 'Hardware Interfacing', 'Data Analysis', 'Git'],
    link: 'https://github.com/agalliani/falaphel3-daq',
    linkLabel: 'View Code on GitHub',
    icon: 'fas fa-terminal',
    gallery: getGallery('deep-tech/falaphel3')
  },
  {
    title: 'X-Ray Irradiation Campaigns',
    subtitle: 'INFN Padova | TID Testing',
    description: 'Executed irradiation campaigns at the Department of Physics in Padova using X-ray facilities. Performed <strong>Total Ionizing Dose (TID)</strong> testing on 28nm CMOS chips, managing the DAQ setup to collect operational data during and after radiation exposure.',
    tech: ['TID Testing', 'X-Ray', 'DAQ', 'Radiation Hardness', 'Data Analysis'],
    icon: 'fas fa-radiation',
    gallery: getGallery('deep-tech/xray-irradiation')
  },
  {
    title: 'Wire Bonding Supervision',
    subtitle: 'INFN Torino/Milano | Manufacturing',
    description: 'Supervised the wire-bonding operations at INFN Physics Departments (Turin/Milan). <strong>Design for Manufacturing:</strong> Personally designed the custom daughter-board PCBs, strictly enforcing <strong>ENIG (Electroless Nickel Immersion Gold)</strong> surface finishing to ensure reliable wire bondability. <strong>Operations:</strong> Managed the bonding setup for both ceramic packages (CPGA) and direct Chip-on-Board (CoB) assemblies.',
    tech: ['Wire Bonding', 'PCB Design', 'ENIG', 'Manufacturing', 'Quality Control'],
    icon: 'fas fa-microchip',
    gallery: getGallery('deep-tech/wire-bonding')
  }
]

const industrial = [
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
    badge: '🥇 1st Place Winner',
    gallery: getGallery('industrial/bosch-challenge')

  },
  {
    title: 'MangroviaIoT Platform',
    subtitle: 'Developer & SRE',
    description: 'Core Developer for a microservices-based IoT platform focused on Asset & Energy Management. Optimized critical frontend modules (Angular) for real-time data visualization dashboards. Full-stack feature implementation ensure high availability for industrial clients.',
    tech: ['Vue.js', 'Angular', 'Microservices', 'SRE', 'Industrial IoT'],
    link: 'https://mangroviaiot.com/',
    linkLabel: 'Visit Platform',
    icon: 'fas fa-server',
  },
  {
    title: 'Smart Gas Meter Firmware | Pietro Fiorentini',
    subtitle: 'Anti-Seismic Safety Algorithms',
    description: 'Developed and optimized embedded firmware algorithms for next-gen smart gas meters. The core task involved implementing <strong>real-time seismic detection</strong>: analyzing accelerometer data to automatically shut off gas flow during earthquake events, ensuring public safety and infrastructure integrity.<br><br><span class="text-slate-300">Context:</span> R&D Contract (BELLFIOR22) for <strong>Pietro Fiorentini S.p.A.</strong>.',
    tech: ['Embedded C', 'Real-Time Systems', 'Signal Processing', 'Safety Critical', 'Industrial R&D'],
    icon: 'fas fa-shield-halved'
  }
]

const ventures = [
  {
    title: 'Mechanical Design & 3D Prototyping',
    subtitle: 'From PCB to Finished Product Enclosures',
    description: 'End-to-end mechanical integration for electronic prototypes. Designed custom enclosures in <strong>Fusion 360</strong> with precise tolerances for PCB mounting, connectors, and thermal dissipation.<br><br><span class="text-slate-300">Production:</span> Manufactured rugged cases for the <strong>Giro-E (MOST)</strong> trackers and ergonomic shells for the <strong>Oxymeter</strong> wearable using <strong>Bambu Lab X1 Carbon</strong> (High-speed/Multi-material) and <strong>Creality Ender 3 S1 Pro</strong>.<br><br><span class="text-slate-300">Lab Fixtures:</span> Created custom supports for Falaphel/PiHex test boards to ensure stability during X-Ray and bonding procedures.',
    tech: ['Fusion 360', 'Bambu Lab X1C', 'PLA/PETG/ABS', 'Rapid Prototyping', 'DFM'],
    icon: 'fas fa-cube',
    gallery: getGallery('ventures/mechanical')
  },
  {
    title: 'Giro-E Technician | MOST Project',
    subtitle: 'Giro-E 2024 | Siena - Naples',
    description: 'Field technician managing prototype devices on race bikes during the <strong>Giro-E 2024</strong> (Siena to Naples). Proved reliability of sensors in extreme real-world conditions.',
    tech: ['Field Testing', 'Sensors', 'E-Bikes', 'Logistics', 'Problem Solving'],
    icon: 'fas fa-bicycle'
  },
  {
    title: 'Smart Fistula Monitor | MedTech',
    subtitle: 'Wearable for Hemodialysis Patients',
    description: 'Developed a non-invasive wearable device to monitor arteriovenous fistulas in hemodialysis patients. Implemented acoustic sensing algorithms using embedded microphones to detect pathological variations, bridging the gap between clinical needs and embedded electronics.<br><br><span class="text-slate-300">Context:</span> Collaboration with <strong>Mario Negri Institute</strong> & UniBG. Awarded by <strong>Fondazione Cariplo</strong> (InnovaWelfare 2025).',
    tech: ['Embedded Audio', 'Medical IoT', 'Signal Processing', 'Prototyping'],
    icon: 'fas fa-stethoscope',
    badge: 'Funded Project'
  }
]
</script>

<template>
  <div class="bg-slate-900">
    <!-- SECTION 0: Interactive Web Apps (Highlighted for Conversion) -->
    <section class="py-24 px-6 relative bg-gradient-to-b from-slate-800/50 to-slate-900 border-b border-white/5">
      <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]"></div>
      <div class="container mx-auto max-w-6xl relative">
        <div class="mb-16">
          <h2 class="text-4xl font-bold text-slate-200 mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-16 after:h-1 after:bg-emerald-500 after:rounded-full">
            Full-Stack Development & Web Design
          </h2>
          <p class="text-slate-300 mt-6 max-w-2xl text-lg font-light leading-relaxed">
            Live demonstrations of full-stack engineering capabilities. <br>
            <span class="text-emerald-400 font-medium">Try the apps directly in your browser.</span>
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <ProjectCard 
            v-for="project in webApps" 
            :key="project.title"
            v-bind="project"
            class="transform hover:scale-[1.01] transition-all duration-300 ring-1 ring-emerald-500/20 hover:ring-emerald-500/50 bg-slate-800/50 backdrop-blur-sm"
          />
        </div>
      </div>
    </section>

    <!-- SECTION 1: Deep Tech & Silicon Innovation -->
    <section class="py-24 px-6 relative">
      <div class="container mx-auto max-w-6xl">
        <div class="mb-16">
          <h2 class="text-4xl font-bold text-slate-200 mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-16 after:h-1 after:bg-amber-500 after:rounded-full">
            Deep Tech & Silicon Innovation
          </h2>
          <p class="text-slate-400 mt-6 max-w-2xl text-lg">
            Academic Excellence, IC Design, Physics, and Research.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            v-for="project in deepTech" 
            :key="project.title"
            v-bind="project"
          />
        </div>
      </div>
    </section>

    <!-- SECTION 2: Industrial IoT & Safety Systems -->
    <section class="py-24 px-6 bg-slate-950 relative border-y border-white/5">
      <div class="container mx-auto max-w-6xl">
        <div class="mb-16">
          <h2 class="text-4xl font-bold text-slate-200 mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-16 after:h-1 after:bg-teal-500 after:rounded-full">
            Industrial IoT & Safety Systems
          </h2>
          <p class="text-slate-400 mt-6 max-w-2xl text-lg">
            Enterprise Solutions, Reliability, Scalability, and Embedded Safety.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            v-for="project in industrial" 
            :key="project.title"
            v-bind="project"
          />
        </div>
      </div>
    </section>

    <!-- SECTION 3: Ventures & Field Operations -->
    <section class="py-24 px-6 relative">
      <div class="container mx-auto max-w-6xl">
        <div class="mb-16">
          <h2 class="text-4xl font-bold text-slate-200 mb-4 relative inline-block after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-16 after:h-1 after:bg-indigo-500 after:rounded-full">
            Ventures & Prototyping
          </h2>
          <p class="text-slate-400 mt-6 max-w-2xl text-lg">
            Entrepreneurship, Product Management, and Real-world Testing.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            v-for="project in ventures" 
            :key="project.title"
            v-bind="project"
          />
        </div>
      </div>
    </section>
  </div>
</template>
