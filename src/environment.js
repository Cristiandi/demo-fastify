const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

let envPath;

// validate the NODE_ENV
const NODE_ENV = process.env.NODE_ENV;
switch (NODE_ENV) {
case 'development':
  envPath = path.resolve(__dirname, '../.env.development');
  break;
case 'staging':
  envPath = path.resolve(__dirname, '../.env.staging');
  break;
case 'production':
  envPath = path.resolve(__dirname, '../.env.production');
  break;
default:
  envPath = path.resolve(__dirname, '../.env.local');
  break;
};

dotenv.config({ path: envPath });

const enviroment = {
  /* GENERAL */
  NODE_ENV,
  TIME_ZONE: process.env.TIME_ZONE,
  APP_PORT: process.env.APP_PORT || 8080,
  /* DATABASE INFORMATION */
  DB_NOSQL_HOST: process.env.DB_NOSQL_HOST,
  DB_NOSQL_USER: process.env.DB_NOSQL_USER,
  DB_NOSQL_PASSWORD: process.env.DB_NOSQL_PASSWORD,
  DB_NOSQL_NAME: process.env.DB_NOSQL_NAME,
  DB_NOSQL_PORT: process.env.DB_NOSQL_PORT,
  DB_SQL_CLIENT: process.env.DB_SQL_CLIENT,
  DB_SQL_HOST: process.env.DB_SQL_HOST,
  DB_SQL_USER: process.env.DB_SQL_USER,
  DB_SQL_PASSWORD: process.env.DB_SQL_PASSWORD,
  DB_SQL_NAME: process.env.DB_SQL_NAME,
  DB_SQL_PORT: process.env.DB_SQL_PORT
};

module.exports = enviroment;
