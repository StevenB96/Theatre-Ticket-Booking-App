// scripts/dev.js
const path = require('path');
const dotenv = require('dotenv');
const { spawn } = require('child_process');

dotenv.config({
  path: path.resolve(process.cwd(), '.env.development'),
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const nextBin = require.resolve('next/dist/bin/next');

spawn(process.execPath, [nextBin, 'dev', '-p', String(port), '-H', host], {
  stdio: 'inherit',
});