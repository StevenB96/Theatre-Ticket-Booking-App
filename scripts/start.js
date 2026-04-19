const path = require('path');
const dotenv = require('dotenv');
const { spawn } = require('child_process');

// Load production env explicitly
dotenv.config({
  path: path.resolve(process.cwd(), '.env.production'),
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

// Next.js production server binary
const nextBin = require.resolve('next/dist/bin/next');

spawn(
  process.execPath,
  [nextBin, 'start', '-p', String(port), '-H', host],
  {
    stdio: 'inherit',
  }
);