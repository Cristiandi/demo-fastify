const oas = require('fastify-swagger');

const apiRoutes = async (app, options) => {
  app.register(oas, require('./docs'));
  app.register(require('./persons'), { prefix: 'persons' });
  app.register(require('./products'), { prefix: 'products' });
  app.get('/', async (request, reply) => {
    return { hello: 'world' };
  });
};

module.exports = apiRoutes;
