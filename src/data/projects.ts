// Single source of truth for project data, consumed by both the home page's
// "Selected work" section (the four `featuredWork` rows) and the full
// /projects page (`projectCategories`). Extracted out of the old Projects.vue
// so the two surfaces never drift apart.
//
// Descriptions are English-only rich HTML (trusted, first-party — rendered with
// v-html). The shape is bilingual-ready: `desc` could later become
// `{ it: string; en: string }` without touching consumers much.

import dalilaHero from '@/assets/images/web-apps/dalila-portfolio-hero.png'
import timelineMeHero from '@/assets/images/web-apps/timeline-me-hero.png'
import oxymeterHero from '@/assets/images/web-apps/oxymeter-hero.png'
import pihexChip from '@/assets/images/deep-tech/pihex/BILINEAR_PRIN_FULLCHIP_3.png'
import falaphelChip from '@/assets/images/deep-tech/falaphel/FLASH_AFE_FALAPHEL_chip_v20.png'

import type { Messages } from '../i18n/messages'

// ---- Galleries -------------------------------------------------------------
// Eagerly resolve every image/video under assets so category items can pull a
// gallery by folder segment (same mechanism the old Projects.vue used).
const globImages = import.meta.glob(
  '/src/assets/images/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP,mp4,webm,mov,MP4,WEBM,MOV}',
  { eager: true, query: '?url', import: 'default' },
)

function getGallery(pathSegment: string): string[] {
  return Object.keys(globImages)
    .filter((path) => path.includes(`/${pathSegment}/`))
    .sort()
    .map((path) => globImages[path] as string)
}

// ---- Types -----------------------------------------------------------------
export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  id: string
  title: string
  subtitle?: string
  /** Rich HTML, English-only for now. Theme-agnostic (only <strong>/<br>). */
  desc: string
  tech: string[]
  link?: string
  linkLabel?: string
  links?: ProjectLink[]
  gallery?: string[]
  image?: string
  badge?: string
}

export interface ProjectCategory {
  id: string
  /** Key into the i18n Messages dict for the category heading. */
  titleKey: keyof Messages
  leadKey: keyof Messages
  /** Accent colour for the section underline. */
  accent: string
  items: Project[]
}

// ---- Featured (home) -------------------------------------------------------
export type FeaturedDescKey = 'tl' | 'dalila' | 'pihex' | 'falaphel'

export interface FeaturedProject {
  id: string
  title: string
  /** Short mono tag shown inline next to the title. */
  tag: string
  /** i18n key for the one-line description. */
  descKey: FeaturedDescKey
  href: string
  image: string
  /** darker thumbnail bg for chip shots vs. web screenshots. */
  dark?: boolean
}

/** The four curated rows on the home page, in order. */
export const featuredWork: FeaturedProject[] = [
  {
    id: 'timeline-me',
    title: 'Timeline Me',
    tag: 'Web app',
    descKey: 'tl',
    href: 'https://agalliani.github.io/timeline-me/',
    image: timelineMeHero,
  },
  {
    id: 'dalila',
    title: 'Dalila Scollo',
    tag: 'Web design',
    descKey: 'dalila',
    href: 'https://dalilascollo.com/',
    image: dalilaHero,
  },
  {
    id: 'pihex',
    title: 'PiHEX',
    tag: 'CMOS 28nm',
    descKey: 'pihex',
    href: 'https://www.dei.unipd.it/system/files/PRIN2022_PiHEX_Gerardin_0.pdf',
    image: pihexChip,
    dark: true,
  },
  {
    id: 'falaphel',
    title: 'Falaphel',
    tag: 'ASIC · Ph.D.',
    descKey: 'falaphel',
    href: 'https://www.sciencedirect.com/science/article/abs/pii/S0168900224007885',
    image: falaphelChip,
    dark: true,
  },
]

// ---- Full archive (/projects) ---------------------------------------------
const webApps: Project[] = [
  {
    id: 'dalila-scollo',
    title: 'Dalila Scollo | Performer & Vocal Coach',
    subtitle: 'Soprano, Dancer & Creative Coach',
    desc: 'Official website of Dalila Scollo, a multi-disciplinary artist and <strong>Soprano (F3-G5)</strong>. The platform showcases her career in <strong>Musical Theatre</strong> and <strong>Commercial Dance</strong>, featuring a rich media gallery of her performances and details on her <strong>Vocal Coaching</strong> methodology.',
    tech: ['Vue.js', 'Tailwind CSS', 'Audio/Video Gallery', 'Responsive'],
    link: 'https://dalilascollo.com/',
    linkLabel: 'Visit Website',
    badge: 'Featured Design',
    image: dalilaHero,
  },
  {
    id: 'timeline-me',
    title: 'Timeline Me',
    subtitle: 'Instant Timeline Generator',
    desc: 'A productivity tool for developers and PMs. Create visual, exportable timelines in seconds. Features an intuitive form interface, custom themes, and high-quality image export.<br><br><strong>Why it exists:</strong> To solve the pain of creating timeline graphics for documentation and presentations manually.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Shadcn UI'],
    link: 'https://agalliani.github.io/timeline-me/',
    linkLabel: 'Launch App',
    badge: 'In Progress',
    image: timelineMeHero,
  },
  {
    id: 'oxymeter',
    title: 'Oxymeter | Sports Tech',
    subtitle: 'IoT Device Companion App',
    desc: 'A scalable <strong>Vue.js Web App</strong> designed to interface with wearable IoT devices. Features real-time data visualization and session management.<br><br><strong>The Pivot:</strong> Transformed a hardware-heavy prototype into a software-first solution to prioritize market validation.',
    tech: ['Vue.js', 'Vite', 'IoT Integration', 'UX Design'],
    link: 'https://www.oxymeter.it/',
    linkLabel: 'Launch App',
    badge: 'Award Winner',
    image: oxymeterHero,
  },
]

const deepTech: Project[] = [
  {
    id: 'pihex',
    title: 'PiHEX | PRIN 2022',
    subtitle: '28nm CMOS for HL-LHC & X-Ray Imaging',
    desc: 'Project aimed at advancing electronic instrumentation for <strong>High Luminosity Accelerators (HL-LHC)</strong> and next-gen <strong>Free Electron Lasers</strong>. Designed prototype chips integrating readout channel matrices with <strong>ultra-fine pitch (&lt;100 µm)</strong> in 28nm CMOS technology. Pushing the limits of spatial resolution and readout speed for future particle physics experiments.<br><br><strong>Context:</strong> Funded by the Italian Ministry of University and Research (MUR) - PRIN 2022 Program.',
    tech: ['PRIN 2022', '28nm CMOS', 'Pixel Detectors', 'HL-LHC', 'X-Ray Imaging'],
    links: [
      { label: 'Project Presentation (Unipd)', url: 'https://www.dei.unipd.it/system/files/PRIN2022_PiHEX_Gerardin_0.pdf' },
      { label: 'CERN Indico Contribution', url: 'https://indico.cern.ch/event/1428808/contributions/6505566/contribution.pdf' },
    ],
    badge: 'MUR Grant',
    gallery: getGallery('deep-tech/pihex'),
  },
  {
    id: 'falaphel',
    title: 'FALAPHEL: Silicon Photonics Readout',
    subtitle: '28nm CMOS Drivers & TIA for High-Rate Physics',
    desc: 'Designed and characterized Mixed-Signal ICs in <strong>TSMC 28nm</strong> technology for Silicon Photonics integration in High Energy Physics detectors.<br><br><strong>Key Responsibilities:</strong> Full-custom design (Schematic/Layout) of analog front-ends and modulator drivers. Designed the PCB test setup and performed post-silicon validation.',
    tech: ['TSMC 28nm', 'Silicon Photonics', 'Cadence Virtuoso', 'PCB Design', 'Lab Testing'],
    links: [
      { label: 'Project Overview (PDF)', url: 'https://agenda.infn.it/event/23453/contributions/117451/attachments/73991/93910/Falaphel.pdf' },
      { label: 'Technical Specifications (PDF)', url: 'https://agenda.infn.it/event/27087/contributions/137028/attachments/82129/107840/spec_v02.pdf' },
    ],
    gallery: getGallery('deep-tech/falaphel'),
  },
  {
    id: 'falaphel3-daq',
    title: 'Falaphel-3 DAQ Framework',
    subtitle: 'Automated Characterization for TOT Readout',
    desc: 'Engineered the full-stack Data Acquisition (DAQ) system for 28nm CMOS chip characterization. Developed Python/C++ drivers to interface with FPGA readout boards and lab instruments, enabling automated <strong>Time-Over-Threshold (TOT)</strong> linearity measurements and noise analysis.',
    tech: ['Python', 'Automated Testing', 'Hardware Interfacing', 'Data Analysis', 'Git'],
    link: 'https://github.com/agalliani/falaphel3-daq',
    linkLabel: 'View Code on GitHub',
    gallery: getGallery('deep-tech/falaphel3'),
  },
  {
    id: 'xray-irradiation',
    title: 'X-Ray Irradiation Campaigns',
    subtitle: 'INFN Padova | TID Testing',
    desc: 'Executed irradiation campaigns at the Department of Physics in Padova using X-ray facilities. Performed <strong>Total Ionizing Dose (TID)</strong> testing on 28nm CMOS chips, managing the DAQ setup to collect operational data during and after radiation exposure.',
    tech: ['TID Testing', 'X-Ray', 'DAQ', 'Radiation Hardness', 'Data Analysis'],
    gallery: getGallery('deep-tech/xray-irradiation'),
  },
  {
    id: 'wire-bonding',
    title: 'Wire Bonding Supervision',
    subtitle: 'INFN Torino/Milano | Manufacturing',
    desc: 'Supervised the wire-bonding operations at INFN Physics Departments (Turin/Milan). <strong>Design for Manufacturing:</strong> Personally designed the custom daughter-board PCBs, strictly enforcing <strong>ENIG (Electroless Nickel Immersion Gold)</strong> surface finishing to ensure reliable wire bondability. <strong>Operations:</strong> Managed the bonding setup for both ceramic packages (CPGA) and direct Chip-on-Board (CoB) assemblies.',
    tech: ['Wire Bonding', 'PCB Design', 'ENIG', 'Manufacturing', 'Quality Control'],
    gallery: getGallery('deep-tech/wire-bonding'),
  },
]

const industrial: Project[] = [
  {
    id: 'bosch-challenge',
    title: 'Bosch Challenge Winner | Edge AI',
    subtitle: 'IoT Predictive Maintenance System',
    desc: 'Winner of the "Bosch Sensortec Making Sensor Tec!" competition. Designed an end-to-end IoT solution for domestic boiler predictive maintenance.<br><br><strong>Tech & Results:</strong> Utilized <strong>Nicla Sense ME</strong> sensors and <strong>Bosch AI Studio</strong> to train Neural Networks on real-world exhaust gas data. Achieved <strong>99.58% accuracy</strong> in detecting equipment aging.',
    tech: ['Edge AI', 'Bosch Sensortec', 'Neural Networks', 'IoT Architecture', 'Data Analysis'],
    link: 'https://www.bosch-press.it/pressportal/it/it/press-release-63680.html',
    linkLabel: 'Read Press Release',
    links: [
      { label: 'View Official LinkedIn Post', url: 'https://www.linkedin.com/posts/bosch-italia_sensingsolutions-sensational-boschitalia-activity-7084804184545345537-wJKk' },
    ],
    badge: '1st Place Winner',
    gallery: getGallery('industrial/bosch-challenge'),
  },
  {
    id: 'mangrovia',
    title: 'MangroviaIoT Platform',
    subtitle: 'Developer & SRE',
    desc: 'Core Developer for a microservices-based IoT platform focused on Asset & Energy Management. Optimized critical frontend modules (Angular) for real-time data visualization dashboards. Full-stack feature implementation ensure high availability for industrial clients.',
    tech: ['Vue.js', 'Angular', 'Microservices', 'SRE', 'Industrial IoT'],
    link: 'https://mangroviaiot.com/',
    linkLabel: 'Visit Platform',
  },
  {
    id: 'smart-gas-meter',
    title: 'Smart Gas Meter Firmware | Pietro Fiorentini',
    subtitle: 'Anti-Seismic Safety Algorithms',
    desc: 'Developed and optimized embedded firmware algorithms for next-gen smart gas meters. The core task involved implementing <strong>real-time seismic detection</strong>: analyzing accelerometer data to automatically shut off gas flow during earthquake events, ensuring public safety and infrastructure integrity.<br><br><strong>Context:</strong> R&D Contract (BELLFIOR22) for <strong>Pietro Fiorentini S.p.A.</strong>.',
    tech: ['Embedded C', 'Real-Time Systems', 'Signal Processing', 'Safety Critical', 'Industrial R&D'],
  },
]

const ventures: Project[] = [
  {
    id: 'mechanical-design',
    title: 'Mechanical Design & 3D Prototyping',
    subtitle: 'From PCB to Finished Product Enclosures',
    desc: 'End-to-end mechanical integration for electronic prototypes. Designed custom enclosures in <strong>Fusion 360</strong> with precise tolerances for PCB mounting, connectors, and thermal dissipation.<br><br><strong>Production:</strong> Manufactured rugged cases for the <strong>Giro-E (MOST)</strong> trackers and ergonomic shells for the <strong>Oxymeter</strong> wearable using <strong>Bambu Lab X1 Carbon</strong> and <strong>Creality Ender 3 S1 Pro</strong>.<br><br><strong>Lab Fixtures:</strong> Created custom supports for Falaphel/PiHex test boards to ensure stability during X-Ray and bonding procedures.',
    tech: ['Fusion 360', 'Bambu Lab X1C', 'PLA/PETG/ABS', 'Rapid Prototyping', 'DFM'],
    gallery: getGallery('ventures/mechanical'),
  },
  {
    id: 'giro-e',
    title: 'Giro-E Technician | MOST Project',
    subtitle: 'Giro-E 2024 | Siena - Naples',
    desc: 'Field technician managing prototype devices on race bikes during the <strong>Giro-E 2024</strong> (Siena to Naples). Proved reliability of sensors in extreme real-world conditions.',
    tech: ['Field Testing', 'Sensors', 'E-Bikes', 'Logistics', 'Problem Solving'],
  },
  {
    id: 'fistula-monitor',
    title: 'Smart Fistula Monitor | MedTech',
    subtitle: 'Wearable for Hemodialysis Patients',
    desc: 'Developed a non-invasive wearable device to monitor arteriovenous fistulas in hemodialysis patients. Implemented acoustic sensing algorithms using embedded microphones to detect pathological variations, bridging the gap between clinical needs and embedded electronics.<br><br><strong>Context:</strong> Collaboration with <strong>Mario Negri Institute</strong> & UniBG. Awarded by <strong>Fondazione Cariplo</strong> (InnovaWelfare 2025).',
    tech: ['Embedded Audio', 'Medical IoT', 'Signal Processing', 'Prototyping'],
    badge: 'Funded Project',
  },
]

export const projectCategories: ProjectCategory[] = [
  { id: 'web', titleKey: 'catWeb', leadKey: 'catWebLead', accent: '#0071e3', items: webApps },
  { id: 'deep-tech', titleKey: 'catDeepTech', leadKey: 'catDeepTechLead', accent: '#8e5ff5', items: deepTech },
  { id: 'industrial', titleKey: 'catIndustrial', leadKey: 'catIndustrialLead', accent: '#14b8a6', items: industrial },
  { id: 'ventures', titleKey: 'catVentures', leadKey: 'catVenturesLead', accent: '#f59e0b', items: ventures },
]
