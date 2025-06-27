// src/library/dbClient.ts
import knex, { Knex } from 'knex';
import { attachKnexLogging } from './knex-logger';
import knexConfig from '../../knexfile';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Step 1: Load base .env first (which sets ENV)
dotenv.config();

const resolvedNodeEnv = process.env.ENV || 'development'; // now ENV is read *after* loading .env
const envFilePath = path.resolve(process.cwd(), `.env.${resolvedNodeEnv}`);

// Step 2: Load ENV-specific override
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
  console.log(`Loaded environment from ${envFilePath}`);
} else {
  console.warn(`No environment override file (${envFilePath}) found. Using base .env`);
}

console.log(`Active ENV: ${resolvedNodeEnv}`);
console.log(`Using knex config for environment: ${resolvedNodeEnv}`);

// Step 3: Narrow the env to what knexConfig expects
const knexEnv: 'development' | 'production' =
  resolvedNodeEnv === 'production' ? 'production' : 'development';

const config = knexConfig[knexEnv];
const db: Knex = knex(config);

// Wire up logging with exit-on-error enabled
attachKnexLogging(db, { exitOnError: true });

export default db;
