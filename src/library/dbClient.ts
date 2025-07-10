// src/library/dbClient.ts
import knex, { Knex } from 'knex';
import { attachKnexLogging } from './knex-logger';
import knexConfig from '../../knexfile';
import { loadEnvironment } from './functions'
import * as dotenv from 'dotenv';
import * as fs from 'fs';

// Step 1: Load the enviroment variables.
const { resolvedEnv, envFilePath } = loadEnvironment();

// Step 2: Load ENV-specific override
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
  console.log(`Loaded environment from ${envFilePath}`);
} else {
  console.warn(`No environment override file (${envFilePath}) found. Using base .env`);
}

console.log(`Active ENV: ${resolvedEnv}`);
console.log(`Using knex config for environment: ${resolvedEnv}`);

// Step 3: Narrow the env to what knexConfig expects
const knexEnv: 'development' | 'production' =
  resolvedEnv === 'production' ? 'production' : 'development';

const config = knexConfig[knexEnv];
const db: Knex = knex(config);

// Wire up logging with exit-on-error enabled
// attachKnexLogging(db, { exitOnError: true });

export default db;
