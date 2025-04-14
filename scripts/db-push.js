#!/usr/bin/env node

/**
 * Database Migration Script
 * 
 * This script loads environment variables before running drizzle-kit push,
 * making it work in both offline and online environments.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file if it exists
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  console.log('Loading environment variables from .env file...');
  dotenv.config({ path: envPath });
}

// Set a default DATABASE_URL for offline development if not provided
if (!process.env.DATABASE_URL) {
  console.log('No DATABASE_URL found. Using default local PostgreSQL connection...');
  process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/wandstudios';
}

console.log('Running database migrations...');

try {
  // Run drizzle-kit push
  execSync('npx drizzle-kit push', { 
    stdio: 'inherit',
    env: process.env 
  });
  console.log('Database migrations completed successfully.');
} catch (error) {
  console.error('Error running database migrations:', error.message);
  process.exit(1);
}