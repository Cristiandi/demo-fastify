const { APP_PORT } = require('./environment');

module.exports = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'fastify demo api',
      description: 'docs',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    servers: [
      { url: `http://localhost:${APP_PORT}`, description: 'local development' },
      { url: 'https://<development-url>', description: 'development' },
      { url: 'https://<staging-url>', description: 'staging' },
      { url: 'https://<production-url>', description: 'production' }
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'person', description: 'Person related end-points' },
      { name: 'product', description: 'Product related end-points' }
    ]
  }
};
