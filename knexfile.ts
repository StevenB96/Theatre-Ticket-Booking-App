import path from 'path';
import type { Knex } from 'knex';

console.log('Migration directory:', path.resolve('./src/db/migrations'));

const config: { [key: string]: Knex.Config } = {
  development: {
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
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    migrations: {
      directory: path.resolve('./src/knex/migrations'),
    },
    seeds: {
      directory: path.resolve('./src/knex/seeds'),
    },
  },
};

export default config;
