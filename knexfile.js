const path = require('path');

console.log('Migration directory:', path.resolve('./src/db/migrations'));

const config = {
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
};

module.exports = config;
