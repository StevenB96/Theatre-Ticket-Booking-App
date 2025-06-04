// src/db.ts
import knex, { Knex } from 'knex';
import knexConfig from '../../knexfile';

const env = (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development';
const config = knexConfig[env];

const db: Knex = knex(config);

export default db;
