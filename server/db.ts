import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import ws from "ws";
import * as schema from "@shared/schema";
import { dbConfig, isDevelopment } from './config';
import pg from 'pg';

// Configure Neon Database for serverless environments
neonConfig.webSocketConstructor = ws;

let db: ReturnType<typeof drizzle> | ReturnType<typeof drizzleNode>;

// Initialize database connection based on environment
function initializeDb() {
  try {
    if (isDevelopment && dbConfig.useLocalFallback) {
      console.log("Using local PostgreSQL database for development");
      const nodePool = new pg.Pool({
        connectionString: dbConfig.url
      });
      // Use drizzle-orm with node-postgres for local development
      db = drizzleNode(nodePool, { schema });
    } else {
      // Use Neon for production or when DATABASE_URL is provided
      console.log("Using Neon PostgreSQL database");
      const pool = new Pool({ connectionString: dbConfig.url });
      db = drizzle({ client: pool, schema });
    }
    
    console.log("Database connection initialized successfully");
    return db;
  } catch (error) {
    console.error("Failed to initialize database connection:", error);
    throw error;
  }
}

// Initialize the database connection
db = initializeDb();

// Export the database connection
export { db };