// Each bullet: [icon, short title, text]. Icons are in components/XpIcon.jsx.
export const JOBS = [
  {
    title: 'Product Engineer · Retrieval Engine',
    org: 'EdgeVerve Systems (Infosys subsidiary)',
    where: 'Bangalore',
    dates: 'Feb 2025 - Present',
    bullets: [
      [
        'engine',
        'Built the Retrieval Engine',
        'A generic Spring Boot microservice that fetches and assembles data across 5+ interdependent banking products, each with its own schemas and tables, through one reusable code path.',
      ],
      [
        'plug',
        'Products plug in, core stays put',
        'Generalized product-specific retrieval logic into reusable abstractions, replacing per-product if-else branches so new products plug in without rewriting core code.',
      ],
      [
        'speed',
        'Made high-volume reads fast',
        'Query rewriting, indexing, batching, parallel fetching and caching, chosen per use case for high-volume banking data.',
      ],
      [
        'stream',
        'Kafka events + Redis cache',
        'The engine publishes retrieval events to Kafka topics that consuming products read asynchronously. Redis caches frequently accessed data.',
      ],
      [
        'ship',
        'Docker → Kubernetes on AWS',
        'Containerized with Docker and deployed as Kubernetes pods on AWS EC2, with a tailored configuration per consuming product; released through Jenkins CI/CD.',
      ],
      [
        'debug',
        'Debugged prod, documented for teams',
        'Debugged production and deployment issues across environments, and wrote integration guides for the product teams consuming the engine.',
      ],
    ],
  },
  {
    title: 'Software Developer Intern',
    org: 'BikerBuds',
    where: 'Berkeley, CA (Remote)',
    dates: 'Jan 2023 - Apr 2023',
    bullets: [
      [
        'ui',
        'Responsive interfaces',
        'Developed responsive interfaces with React.js and Tailwind CSS.',
      ],
      ['api', 'RESTful APIs', 'Built RESTful APIs with Node.js and Express.js.'],
      [
        'state',
        'Redux state',
        'Implemented Redux state management for complex application workflows.',
      ],
    ],
  },
];
