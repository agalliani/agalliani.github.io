// Centralised IT/EN copy for the home page and the /projects page chrome.
// Project *descriptions* live in src/data/projects.ts and are English-only for
// now (see the `desc` field there); everything a visitor reads as UI chrome —
// nav, section headings, CTAs, labels — is translated here.
//
// Kept as a plain typed dictionary (no vue-i18n) — see useI18n() for the why.

export type Lang = 'it' | 'en'

export interface Messages {
  // Header / nav
  navWork: string
  navBlog: string
  navContact: string

  // Hero
  role: string
  heroTag: string
  heroLead: string
  ctaBlog: string
  ctaWork: string

  // Blog section (dark)
  blogKicker: string
  blogTitle: string
  blogLead: string
  blogLatest: string
  blogAllPosts: string

  // Blog pages (/blog and /blog/:slug)
  blogPageLead: string
  blogEmpty: string
  backBlog: string
  postNotFound: string
  postNotFoundLead: string

  // Selected work (home) + projects page
  workKicker: string
  workTitle: string
  workLead: string
  allWork: string
  // Curated one-liners for the featured rows on the home page.
  oxy: string
  tl: string
  dalila: string
  pihex: string
  falaphel: string

  // Projects page
  projectsTitle: string
  projectsLead: string
  backHome: string
  statusWip: string
  catWeb: string
  catDeepTech: string
  catIndustrial: string
  catVentures: string
  catWebLead: string
  catDeepTechLead: string
  catIndustrialLead: string
  catVenturesLead: string
  resources: string
  readMore: string
  showLess: string

  // Footer / contact
  contactKicker: string
  contactTitle: string
  contactLead: string

  // Cookie consent banner
  consentText: string
  consentAccept: string
  consentReject: string

  // Meta descriptions. Translated like everything else: an English page whose
  // <meta description> is Italian is the fastest way to look untranslated in a
  // search result, which is the only place most people ever see it.
  seoSiteDesc: string
  seoHomeDesc: string
  seoProjectsDesc: string
  seoBlogDesc: string
}

export const messages: Record<Lang, Messages> = {
  it: {
    navWork: 'Progetti',
    navBlog: 'Blog',
    navContact: 'Contatti',

    role: 'AMS Engineer · Ph.D. in Microelettronica',
    heroTag: 'Progetto, scrivo codice e costruisco prodotti. Poi lo racconto qui.',
    heroLead:
      'Lavoro tra la progettazione di chip analogici e lo sviluppo software. Sul blog documento i miei progetti mentre prendono forma: dall’hardware alla stratosfera, fino al business.',
    ctaBlog: 'Leggi il blog',
    ctaWork: 'Guarda i progetti',

    blogKicker: 'Il blog',
    blogTitle: 'Costruire in pubblico',
    blogLead:
      'Scrivo dei miei progetti mentre li costruisco: le scelte, gli errori e i numeri veri.',
    blogLatest: 'Ultimo articolo',
    blogAllPosts: 'Tutti gli articoli →',

    blogPageLead:
      'Appunti e articoli dai progetti che sto costruendo: le scelte, gli errori e i numeri veri.',
    blogEmpty: 'Nessun articolo pubblicato per ora.',
    backBlog: '← Blog',
    postNotFound: 'Articolo non trovato',
    postNotFoundLead: 'L’articolo che cerchi non esiste o è stato spostato.',

    workKicker: 'Progetti selezionati',
    workTitle: 'Cose che ho costruito',
    workLead: 'Una selezione tra web, hardware e deep tech.',
    allWork: 'Tutti i progetti →',
    oxy: 'Dispositivo IoT e app per l’allenamento: dal prototipo ai primi dati sul campo.',
    tl: 'Crea timeline pronte da esportare in pochi secondi.',
    dalila: 'Sito portfolio disegnato e sviluppato su misura.',
    pihex: 'Chip in CMOS 28nm per gli acceleratori HL-LHC al CERN.',
    falaphel: 'Front-end analogico in CMOS 28nm per rivelatori a pixel dei futuri collider.',

    projectsTitle: 'Tutti i progetti',
    projectsLead:
      'L’archivio completo: dal software full-stack ai chip in silicio, dall’IoT industriale ai prototipi sul campo.',
    backHome: '← Home',
    statusWip: 'In cantiere',
    catWeb: 'Full-Stack & Web Design',
    catDeepTech: 'Deep Tech & Silicio',
    catIndustrial: 'IoT Industriale & Sicurezza',
    catVentures: 'Ventures & Prototipazione',
    catWebLead: 'App live e siti costruiti end-to-end.',
    catDeepTechLead: 'Design IC, fisica e ricerca accademica.',
    catIndustrialLead: 'Soluzioni enterprise, affidabilità e safety embedded.',
    catVenturesLead: 'Imprenditorialità, prodotto e test nel mondo reale.',
    resources: 'Risorse',
    readMore: 'Leggi tutto',
    showLess: 'Riduci',

    contactKicker: 'Contatti',
    contactTitle: 'Parliamone',
    contactLead:
      'Mi fa sempre piacere parlare di tecnologia, prodotti e nuove idee. Scrivimi.',

    consentText:
      'Uso Google Analytics per capire come viene letto il sito. Nessun dato viene usato per pubblicità.',
    consentAccept: 'Accetta',
    consentReject: 'Rifiuta',

    seoSiteDesc:
      'Portfolio di Andrea Galliani, Ph.D. — AMS Engineer in Bosch Sensortec. Deep tech, progettazione analogica mixed-signal e IoT industriale.',
    seoHomeDesc:
      'Andrea Galliani — AMS Engineer e Ph.D. in Microelettronica. Progetto chip analogici e sviluppo software, e documento i miei progetti (HAB, Oxymeter) costruendo in pubblico.',
    seoProjectsDesc:
      'Archivio completo dei progetti di Andrea Galliani — web app full-stack, silicio in CMOS 28nm, IoT industriale e prototipi sul campo.',
    seoBlogDesc:
      'Articoli e note dal progetto HAB e dallo sviluppo con l’AI come copilota — learn in public.',
  },
  en: {
    navWork: 'Work',
    navBlog: 'Blog',
    navContact: 'Contact',

    role: 'AMS Engineer · Ph.D. in Microelectronics',
    heroTag: 'I design, I write code, I build products. Then I write about it here.',
    heroLead:
      'I work across analog chip design and software development. On the blog I document my projects as they take shape: from hardware to the stratosphere, all the way to business.',
    ctaBlog: 'Read the blog',
    ctaWork: 'See the work',

    blogKicker: 'The blog',
    blogTitle: 'Building in public',
    blogLead:
      'I write about my projects while I build them: the choices, the mistakes and the real numbers.',
    blogLatest: 'Latest post',
    blogAllPosts: 'All posts →',

    blogPageLead:
      'Notes and articles from the projects I am building: the choices, the mistakes and the real numbers.',
    blogEmpty: 'No posts published yet.',
    backBlog: '← Blog',
    postNotFound: 'Post not found',
    postNotFoundLead: 'The post you are looking for does not exist or has moved.',

    workKicker: 'Selected work',
    workTitle: 'Things I’ve built',
    workLead: 'A selection across web, hardware and deep tech.',
    allWork: 'All projects →',
    oxy: 'IoT device and training app: from prototype to the first real field data.',
    tl: 'Build export-ready timelines in seconds.',
    dalila: 'A portfolio site designed and built from scratch.',
    pihex: '28nm CMOS chip for CERN’s HL-LHC accelerators.',
    falaphel: '28nm CMOS analog front-end for pixel detectors at future colliders.',

    projectsTitle: 'All projects',
    projectsLead:
      'The full archive: from full-stack software to silicon chips, from industrial IoT to field prototypes.',
    backHome: '← Home',
    statusWip: 'In the works',
    catWeb: 'Full-Stack & Web Design',
    catDeepTech: 'Deep Tech & Silicon',
    catIndustrial: 'Industrial IoT & Safety',
    catVentures: 'Ventures & Prototyping',
    catWebLead: 'Live apps and sites built end-to-end.',
    catDeepTechLead: 'IC design, physics and academic research.',
    catIndustrialLead: 'Enterprise solutions, reliability and embedded safety.',
    catVenturesLead: 'Entrepreneurship, product and real-world testing.',
    resources: 'Resources',
    readMore: 'Read more',
    showLess: 'Show less',

    contactKicker: 'Contact',
    contactTitle: 'Let’s talk',
    contactLead:
      'I always enjoy talking about technology, products and new ideas. Get in touch.',

    consentText:
      'I use Google Analytics to understand how the site is read. No data is used for advertising.',
    consentAccept: 'Accept',
    consentReject: 'Reject',

    seoSiteDesc:
      'Portfolio of Andrea Galliani, Ph.D. — AMS Engineer at Bosch Sensortec. Deep tech, analog mixed-signal design and industrial IoT.',
    seoHomeDesc:
      'Andrea Galliani — AMS Engineer & Ph.D. in Microelectronics. I design analog chips and build software, and I document my projects (HAB, Oxymeter) building in public.',
    seoProjectsDesc:
      'Full archive of Andrea Galliani projects — full-stack web apps, 28nm CMOS silicon design, industrial IoT and field prototypes.',
    seoBlogDesc:
      'Articles and notes from the HAB project and from building software with AI as a copilot — learn in public.',
  },
}
