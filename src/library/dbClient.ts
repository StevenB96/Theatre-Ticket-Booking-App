import knex, { Knex } from 'knex';
import knexConfig from '../../knexfile';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Step 1: Load base .env (must include ENV=development or production)
dotenv.config();

// Step 2: Determine correct environment file (e.g., .env.production)
const appEnv = process.env.ENV || 'development';
const envFile = path.resolve(process.cwd(), `.env.${appEnv}`);

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`Loaded environment from ${envFile}`);
} else {
  console.warn(`No environment override file (${envFile}) found. Using base .env`);
}

// Step 3: Pick knex config based on NODE_ENV
const knexEnv = (process.env.NODE_ENV as 'development' | 'production') || 'development';
const config = knexConfig[knexEnv];

const db: Knex = knex(config);

export default db;
