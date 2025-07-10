// src/library/loadEnvironment.ts
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export function formatDateToDDMMYYYY(date: Date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function parseDDMMYYYYToISO(dateStr: string) {
  // e.g. "22/06/2025" => "2025-06-22"
  const [d, m, y] = dateStr.split('/');
  if (!d || !m || !y) return null;
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

/**
 * Loads base .env and then overlays .env.{ENV}.
 * Returns the resolved environment name and file path.
 */
export function loadEnvironment(): { resolvedEnv: string; envFilePath: string } {
  // Load base .env first
  dotenv.config();

  const resolvedEnv = process.env.ENV || 'development';
  const envFilePath = path.resolve(process.cwd(), `.env.${resolvedEnv}`);

  // If specific .env.{ENV} exists, load and override
  if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
  }

  return { resolvedEnv, envFilePath };
}
