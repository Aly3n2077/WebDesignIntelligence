import dotenv from 'dotenv';

// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Environment detection
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

// Database configuration
export const dbConfig = {
  url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/wandstudios',
  // For offline development with fallback to local PostgreSQL
  useLocalFallback: !process.env.DATABASE_URL && isDevelopment,
};

// Server configuration
export const serverConfig = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || '0.0.0.0',
};

// For the case where no real DATABASE_URL is available but we're trying 
// to run in a non-development environment
if (!dbConfig.url && !isDevelopment) {
  console.warn('No DATABASE_URL provided and not in development mode. This may cause connection issues.');
}