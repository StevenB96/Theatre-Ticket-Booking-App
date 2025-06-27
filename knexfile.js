// knexfile.js
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Step 1: Load base .env (this contains ENV)
dotenv.config();

// Step 2: Use the ENV value from .env to load env-specific file
const envName = process.env.ENV || 'development';
const envFile = path.resolve(process.cwd(), `.env.${envName}`);

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`Loaded environment variables from: ${envFile}`);
} else {
  console.warn(`No ${envFile} file found. Using base .env only`);
}

console.log('Active ENV:', envName);

// Knex configurations
const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve('./dev.sqlite3'),
  },
  useNullAsDefault: true,
  debug: true,
  migrations: {
    directory: path.resolve('./src/knex/migrations'),
  },
  seeds: {
    directory: path.resolve('./src/knex/seeds'),
  },
};

const production = {
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: path.resolve('./src/knex/migrations'),
  },
  seeds: {
    directory: path.resolve('./src/knex/seeds'),
  },
};

module.exports = { development, production };
