// Nodes of the EdgeVerve request-flow diagram.
export const NODES = [
  {
    name: 'Client app',
    sub: 'Consuming product',
    detail: 'A product used by bank staff or customers calls its own services over REST.',
  },
  {
    name: 'Product service',
    sub: 'Built by a product team',
    detail:
      'The downstream product team integrates the shared engine and customizes it to their product requirements.',
  },
  {
    name: 'Reusable engine',
    sub: 'What I build',
    detail:
      'A Spring Boot microservice component with REST APIs, request validation and business logic, shared by many products from one codebase.',
  },
  {
    name: 'Database',
    sub: 'Related tables',
    detail:
      'Data retrieval and validation across multiple related entities and tables, so every product sees consistent information.',
  },
];
