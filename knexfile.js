const path = require('path');

console.log('Migration directory:', path.resolve('./src/db/migrations'));

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve('dev.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve('./src/db/migrations'),
    },
    seeds: {
      directory: path.resolve('./src/db/seeds'),
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
      directory: path.resolve('./src/db/migrations'),
    },
    seeds: {
      directory: path.resolve('./src/db/seeds'),
    },
  },
};
