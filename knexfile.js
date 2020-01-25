const {
  DB_SQL_CLIENT,
  DB_SQL_HOST,
  DB_SQL_USER,
  DB_SQL_PASSWORD,
  DB_SQL_NAME,
  DB_SQL_PORT
} = require('./src/environment');
// Update with your config settings.

const config = {
  client: DB_SQL_CLIENT,
  connection: {
    host: DB_SQL_HOST,
    user: DB_SQL_USER,
    password: DB_SQL_PASSWORD,
    database: DB_SQL_NAME,
    port: DB_SQL_PORT
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

module.exports = {
  local: { ...config },

  development: { ...config },

  staging: { ...config },

  production: { ...config }

};
