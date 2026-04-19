const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load local env for manual CLI use (safe in dev; runtime env still wins)
const localEnvPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(localEnvPath)) {
  dotenv.config({ path: localEnvPath });
}

const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(process.cwd(), 'dev.sqlite3'),
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(process.cwd(), 'src/knex/migrations'),
  },
  seeds: {
    directory: path.resolve(process.cwd(), 'src/knex/seeds'),
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
    directory: path.resolve(process.cwd(), 'src/knex/migrations'),
  },
  seeds: {
    directory: path.resolve(process.cwd(), 'src/knex/seeds'),
  },
};

module.exports = { development, production };