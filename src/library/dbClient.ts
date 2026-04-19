import knex, { Knex } from 'knex';
import knexConfig from '../../knexfile';

const envName = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const config = knexConfig[envName];

const db: Knex = knex(config);
export default db;