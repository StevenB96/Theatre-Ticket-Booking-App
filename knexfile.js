const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load base .env first (this should include ENV=development or ENV=production)
dotenv.config();

const envName = process.env.ENV || 'development';
const envFile = `.env.${envName}`;

// Load override env file if it exists
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`Loaded environment variables from: ${envFile}`);
} else {
  console.warn(`No ${envFile} file found. Falling back to base .env`);
}

console.log('Active ENV:', envName);

// Define development config (SQLite)
const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve('dev.sqlite3'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve('./src/knex/migrations'),
  },
  seeds: {
    directory: path.resolve('./src/knex/seeds'),
  },
};

// Define production config (MySQL)
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

// Export the full config object
module.exports = {
  development,
  production,
};
