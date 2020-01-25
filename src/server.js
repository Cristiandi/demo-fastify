const fastify = require('fastify');
const cors = require("cors");

const { APP_PORT } = require('./environment');

// order to register / load
// 1. plugins (from the Fastify ecosystem)
// 2. your plugins (your custom plugins)
// 3. decorators
// 4. hooks and middlewares
// 5. your services

const app = fastify({
  bodyLimit: 1048576 * 2,
  logger: { prettyPrint: true }
});

// plugins
app.register(require('./plugins/knex-db-connector'), {});
app.register(require('./plugins/mongo-db-connector'), {});
app.register(require('./routes/api'), { prefix: 'api' });

// middlewares
app.use(cors());

const start = async () => {
  let address;
  try {
   address = await app.listen(APP_PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}.`);
}
start();