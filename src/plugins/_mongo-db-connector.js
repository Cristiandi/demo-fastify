const fastifyPlugin = require('fastify-plugin');
const MongoClient = require('mongodb').MongoClient;

const {
  DB_NOSQL_USER,
  DB_NOSQL_PASSWORD,
  DB_NOSQL_HOST,
  DB_NOSQL_NAME
} = require('../environment');

const MONGO_URL = `mongodb+srv://${DB_NOSQL_USER}:${DB_NOSQL_PASSWORD}@${DB_NOSQL_HOST}/${DB_NOSQL_NAME}?retryWrites=true&w=majority`;

const mongoConnector = async (app, options) => {
  const url = options.url || MONGO_URL;
  delete options.url;

  const db = await MongoClient.connect(url, {
    ...options,
    useUnifiedTopology: true
  });
  app.decorate('mongo', db);
};

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(mongoConnector);
