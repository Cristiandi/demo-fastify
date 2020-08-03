const Fastify = require('fastify');
const cors = require('cors');

// order to register / load
// 1. plugins (from the Fastify ecosystem)
// 2. your plugins (your custom plugins)
// 3. decorators
// 4. hooks and middlewares
// 5. your services

const build = async () => {
  const fastify = Fastify({
    bodyLimit: 1048576 * 2,
    logger: { prettyPrint: true }
  });

  // plugins
  await require('./plugins/mongo-db-connector')(fastify);

  await fastify.register(require('fastify-express'));
  await fastify.register(require('./plugins/knex-db-connector'), {});
  await fastify.register(require('./routes/api'), { prefix: 'api' });

  // hooks
  fastify.addHook('onClose', (instance, done) => {
    const { knex } = instance;
    knex.destroy(() => instance.log.info('knex pool destroyed.'));
  });

  // middlewares
  fastify.use(cors());

  return fastify;
};

// implement inversion of control to make the code testable
module.exports = {
  build
};
