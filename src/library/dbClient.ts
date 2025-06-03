import knex from 'knex';
import knexConfig from '../../knexfile';

const env = process.env.NODE_ENV || 'development';
const config = knexConfig[env];

const db = knex(config);

export default db;
