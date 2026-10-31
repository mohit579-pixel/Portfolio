// Content for the Retrieval Engine explorer (the EdgeVerve section).
// Everything here is a simplified, generic view. No product internals.

export const TABS = [
  ['flow', 'Request flow'],
  ['design', 'Plug-in design'],
  ['perf', 'Performance'],
  ['ship', 'Delivery'],
];

// Request flow -------------------------------------------------------------

export const NODES = [
  {
    name: 'Consuming product',
    sub: 'One of 5+',
    detail:
      'A banking product that needs data spread across its own schemas and the schemas of the products it depends on.',
  },
  {
    name: 'Retrieval Engine',
    sub: 'What I build',
    detail:
      'A generic Spring Boot microservice. One reusable code path fetches and assembles data for every product, driven by that product’s configuration.',
  },
  {
    name: 'Redis',
    sub: 'Cache',
    detail:
      'Frequently accessed data is served from Redis, so hot reads skip the database entirely.',
  },
  {
    name: 'Database',
    sub: 'Many schemas',
    detail:
      'Interdependent products, each with its own schemas and tables. Queries are rewritten, indexed, batched and fetched in parallel depending on the use case.',
  },
  {
    name: 'Kafka',
    sub: 'Event topics',
    detail:
      'The engine publishes retrieval events to Kafka topics, so producers and consumers stay decoupled.',
  },
  {
    name: 'Other products',
    sub: 'Async consumers',
    detail: 'Downstream products read those events asynchronously, at their own pace.',
  },
];

// [node index, log line]
export const PATHS = {
  cold: [
    [0, 'GET /retrieve  product=A  entity=account'],
    [1, 'Resolve product A config, build one retrieval plan'],
    [2, 'Cache MISS'],
    [3, 'Batched + parallel fetch across related schemas'],
    [2, 'Write result to Redis for the next caller'],
    [1, 'Assemble response, return 200'],
    [4, 'Publish retrieval event to topic'],
    [5, 'Consumers pick the event up asynchronously'],
  ],
  warm: [
    [0, 'GET /retrieve  product=A  entity=account'],
    [1, 'Resolve product A config, build one retrieval plan'],
    [2, 'Cache HIT, no database round trip'],
    [1, 'Assemble response, return 200'],
    [4, 'Publish retrieval event to topic'],
    [5, 'Consumers pick the event up asynchronously'],
  ],
};

// Plug-in design -----------------------------------------------------------

export const BEFORE_CODE = `// Every new product meant editing the core
Result retrieve(Request req) {
  if (req.product().equals("A")) {
    // product A tables, joins, rules...
  } else if (req.product().equals("B")) {
    // product B tables, joins, rules...
  } else if (req.product().equals("C")) {
    // ...and it keeps growing
  }
}`;

export const AFTER_CODE = `// One code path. Products plug in.
public interface RetrievalSpec {
  String productId();
  List<SourceTable> sources();
  Plan plan(Request req);
}

@Service
class RetrievalEngine {
  private final Map<String, RetrievalSpec> specs;

  Result retrieve(Request req) {
    RetrievalSpec spec = specs.get(req.product());
    return executor.run(spec.plan(req));
  }
}`;

export const INITIAL_PLUGINS = ['A', 'B', 'C', 'D', 'E'];

// Performance --------------------------------------------------------------

export const TECHNIQUES = [
  {
    key: 'rewrite',
    name: 'Query rewriting',
    what: 'Reshape heavy queries: fewer joins, tighter predicates, only the columns that are needed.',
    when: 'A single query dominates the response time.',
  },
  {
    key: 'index',
    name: 'Indexing',
    what: 'Add indexes that match the real access patterns of each product’s lookups.',
    when: 'Large tables are scanned for a small slice of rows.',
  },
  {
    key: 'batch',
    name: 'Batching',
    what: 'Replace many small round trips with a few grouped queries.',
    when: 'The same lookup runs once per record (the N+1 pattern).',
  },
  {
    key: 'parallel',
    name: 'Parallel fetching',
    what: 'Fetch independent schemas at the same time, then assemble the result.',
    when: 'A response needs data from several products that don’t depend on each other.',
  },
  {
    key: 'cache',
    name: 'Caching',
    what: 'Keep frequently accessed data in Redis in front of the database.',
    when: 'The same data is read far more often than it changes.',
  },
];

// Delivery -----------------------------------------------------------------

export const STAGES = [
  { name: 'Git', sub: 'Push', detail: 'Changes land through a Git-based Agile workflow.' },
  {
    name: 'Jenkins',
    sub: 'CI/CD',
    detail: 'Jenkins pipelines build, test and release the engine.',
  },
  {
    name: 'Maven',
    sub: 'Build',
    detail: 'Maven builds the Spring Boot service and runs the tests.',
  },
  { name: 'Docker', sub: 'Image', detail: 'The engine is packaged as a Docker image.' },
  {
    name: 'Kubernetes',
    sub: 'Pods on AWS EC2',
    detail:
      'Deployed as Kubernetes pods on AWS EC2, inside each consuming product, with a configuration tailored to that product.',
  },
];

export const POD_PRODUCTS = ['A', 'B', 'C'];

// Illustrative per-product config, not real values.
export const podConfig = (p) => `# retrieval-engine, deployed for product ${p}
product:
  id: product-${p.toLowerCase()}
  schemas: [${p.toLowerCase()}_core, shared_ref]
kafka:
  topic: retrieval.events.${p.toLowerCase()}
redis:
  enabled: true
resources:
  replicas: ${p === 'A' ? 3 : 2}`;
