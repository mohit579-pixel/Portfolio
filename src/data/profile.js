export const SITE_TITLE = 'Mohit Khandelwal — Software Engineer';

export const HERO = {
  meta: '[00] Mohit Khandelwal · Software Engineer · Bangalore',
  first: 'Mohit',
  last: 'Khandelwal.',
  lead: 'I build the Retrieval Engine that 5+ core banking products fetch their data through.',
  body: 'Java and Spring Boot engineer at EdgeVerve (Infosys). I own it end to end: design, query optimization, Kafka events, Redis caching, Docker builds, Jenkins CI/CD and Kubernetes pods on AWS.',
  cta: "See what I've built",
  resume: 'Download resume',
};

// [code, text, label]
export const GLANCE = [
  [
    'A-01',
    '1.5+ years as a Product Engineer at EdgeVerve Systems, an Infosys subsidiary',
    'Company',
  ],
  [
    'A-02',
    'Built the Retrieval Engine, one Spring Boot microservice serving 5+ banking products',
    'Backend',
  ],
  ['A-03', 'Kafka event publishing and Redis caching for high-volume banking data', 'Distributed'],
  [
    'A-04',
    'Docker, Jenkins CI/CD and Kubernetes pods on AWS EC2, one config per product',
    'DevOps',
  ],
  ['A-05', 'B.E. in AI & Data Science, CGPA 9.2/10', 'Education'],
  ['A-06', 'Developer of the Year at a competitive hackathon', 'Award'],
];

export const SECTIONS = {
  projects: {
    idx: '[01] Projects',
    title: 'Built to be used.',
    sub: 'Open a project to get its own page with a playable demo. Sounds are on, and you can mute them in the header.',
  },
  work: {
    idx: '[02] EdgeVerve',
    title: 'The Retrieval Engine.',
    sub: 'My day job is one generic engine that 5+ interdependent banking products read their data through. Explore how it works, how it is designed, and how it ships. Simplified, no product internals.',
  },
  log: {
    idx: '[03] Experience',
    title: 'Session log.',
    sub: 'Open a role to read what I did there.',
  },
  tools: {
    idx: '[04] Toolbox',
    title: 'What I reach for.',
    sub: 'Filter by area, or hover the strip to pause it.',
  },
  about: { idx: '[05] About', title: 'Backend first.' },
  contact: {
    idx: '[06] Contact',
    title: 'Open a session',
    sub: 'Hiring, or just want to talk backend and distributed systems? My inbox is open.',
  },
};

export const ABOUT = [
  "I'm a software engineer with 1.5+ years at EdgeVerve (Infosys), where I designed and own the Retrieval Engine: a generic, high-performance data-retrieval microservice used by 5+ interdependent products of an enterprise core banking platform.",
  'I care about the whole path from code to production: clean abstractions so new products plug in without touching core code, queries tuned per use case, events on Kafka, a Redis cache in front of hot data, and a Jenkins pipeline that ships Docker images as Kubernetes pods on AWS EC2.',
  "When something breaks across environments, I'm usually the one debugging it, and I write the integration guides that let product teams adopt the engine on their own.",
];

export const EDUCATION = [
  {
    title: 'Education',
    lines: [
      'B.E. in Artificial Intelligence & Data Science',
      'Dr. D. Y. Patil Institute of Technology, Pune',
      '2021 - 2025 · CGPA 9.2/10',
    ],
  },
  {
    title: 'Senior Secondary (HSC)',
    lines: ['D.P. Mehta Jr College, Lonavala', '2020 - 2021 · 82.3%'],
  },
];

export const FOOTER_NOTE = '© 2026 Mohit Khandelwal · Bangalore, India';
