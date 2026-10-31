export const PROJECTS = [
  {
    id: 'P-01',
    name: 'AI-Driven Dental Healthcare System',
    type: 'Full-stack + ML',
    menuLabel: 'Open Dental system',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'TensorFlow.js', 'JWT', 'MediaPipe'],
    built: [
      'A full-stack dental care platform: patients book and manage appointments, and dentists see schedules and patient records through role-specific dashboards.',
      'Hands-free accessibility: voice commands and camera-based hand-gesture controls let users navigate and act without touching the screen.',
      'An in-browser TensorFlow.js model analyzes uploaded dental images to flag likely conditions (e.g. cavities) for early screening. REST APIs on Node.js/Express are secured with JWT.',
    ],
  },
  {
    id: 'P-02',
    name: 'Mantionify',
    type: 'Real estate platform',
    menuLabel: 'Open Mantionify',
    stack: ['Node.js', 'Express.js', 'MongoDB'],
    badge: 'Developer of the Year, hackathon',
    built: [
      'A real-estate platform where users list properties to buy or sell.',
      'Awarded Developer of the Year for innovation at a competitive hackathon.',
    ],
  },
  {
    id: 'P-03',
    name: 'Wanderlust',
    type: 'Travel platform',
    menuLabel: 'Open Wanderlust',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'EJS'],
    built: [
      'A travel listing platform where users browse, create, edit and review hotel and stay listings.',
      'Clean MVC architecture: models, routes/controllers and EJS views on Express, data in MongoDB.',
      'Full CRUD for listings and reviews, with server-side validation and centralized error handling.',
    ],
  },
];
