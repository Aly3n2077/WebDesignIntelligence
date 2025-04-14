#!/usr/bin/env node

/**
 * PostgreSQL Database Export Script
 * 
 * This script exports the database to a SQL file for offline development,
 * ensuring all data and schema are properly captured.
 * 
 * Usage: node scripts/db-export.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');
const readline = require('readline');

// Load environment variables
dotenv.config();

// Configuration
const OUTPUT_DIR = path.join(__dirname, '../db-backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const DEFAULT_OUTPUT_FILE = path.join(OUTPUT_DIR, `wandstudios-${timestamp}.sql`);

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Parses a PostgreSQL connection string
 */
function parseConnectionString(connectionString) {
  try {
    if (!connectionString) {
      throw new Error('No connection string provided');
    }

    // Add protocol if missing
    if (!connectionString.startsWith('postgresql://')) {
      connectionString = `postgresql://${connectionString}`;
    }

    const url = new URL(connectionString);
    return {
      user: url.username,
      password: url.password,
      host: url.hostname,
      port: url.port || '5432',
      database: url.pathname.slice(1) // Remove leading '/'
    };
  } catch (error) {
    console.error('Failed to parse connection string:', error.message);
    return null;
  }
}

/**
 * Exports the database to a SQL file
 */
function exportDatabase(connectionDetails, outputFile) {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(path.dirname(outputFile))) {
      fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    }

    // Command to export database
    const command = `pg_dump -h ${connectionDetails.host} -p ${connectionDetails.port} -U ${connectionDetails.user} -d ${connectionDetails.database} -f "${outputFile}" --clean --if-exists`;

    // Log the command (without password)
    console.log(`Running: ${command}`);

    // Set PGPASSWORD environment variable
    const env = { ...process.env, PGPASSWORD: connectionDetails.password };

    // Execute pg_dump
    execSync(command, { env });

    console.log(`Database exported successfully to: ${outputFile}`);
    return true;
  } catch (error) {
    console.error('Error exporting database:', error.message);
    return false;
  }
}

/**
 * Main function
 */
function main() {
  console.log('W&D Studios - PostgreSQL Database Export');
  console.log('=======================================\n');

  // Try to get connection string from environment
  const envConnectionString = process.env.DATABASE_URL;

  if (envConnectionString) {
    console.log('Found DATABASE_URL in environment variables');
    rl.question('Use this connection string? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        const connectionDetails = parseConnectionString(envConnectionString);
        if (connectionDetails) {
          // Ask for output file
          rl.question(`Output file (default: ${path.relative(process.cwd(), DEFAULT_OUTPUT_FILE)}): `, (outputPath) => {
            const outputFile = outputPath ? path.resolve(outputPath) : DEFAULT_OUTPUT_FILE;
            const success = exportDatabase(connectionDetails, outputFile);
            if (success) {
              // Create an import script alongside the export
              createImportScript(outputFile);
            }
            rl.close();
          });
        } else {
          rl.close();
        }
      } else {
        promptForConnectionString();
      }
    });
  } else {
    promptForConnectionString();
  }

  function promptForConnectionString() {
    rl.question('Enter PostgreSQL connection string (postgresql://user:password@host:port/dbname): ', (connectionString) => {
      const connectionDetails = parseConnectionString(connectionString);
      if (connectionDetails) {
        // Ask for output file
        rl.question(`Output file (default: ${path.relative(process.cwd(), DEFAULT_OUTPUT_FILE)}): `, (outputPath) => {
          const outputFile = outputPath ? path.resolve(outputPath) : DEFAULT_OUTPUT_FILE;
          const success = exportDatabase(connectionDetails, outputFile);
          if (success) {
            // Create an import script alongside the export
            createImportScript(outputFile);
          }
          rl.close();
        });
      } else {
        rl.close();
      }
    });
  }
}

/**
 * Creates a companion script to import the database
 */
function createImportScript(exportFilePath) {
  const importScriptPath = exportFilePath.replace('.sql', '-import.js');
  
  const scriptContent = `#!/usr/bin/env node

/**
 * PostgreSQL Database Import Script
 * 
 * This script imports a SQL database dump into your local PostgreSQL instance.
 * 
 * Usage: node ${path.basename(importScriptPath)}
 */

const { execSync } = require('child_process');
const readline = require('readline');
const path = require('path');

// Path to the SQL dump file
const DUMP_FILE = path.join(__dirname, '${path.basename(exportFilePath)}');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Main function
 */
function main() {
  console.log('W&D Studios - PostgreSQL Database Import');
  console.log('=======================================\\n');
  
  rl.question('Enter connection details for your local PostgreSQL server:\\n', () => {
    rl.question('Username (default: postgres): ', (username) => {
      const user = username || 'postgres';
      
      rl.question('Password: ', (password) => {
        rl.question('Host (default: localhost): ', (host) => {
          const dbHost = host || 'localhost';
          
          rl.question('Port (default: 5432): ', (port) => {
            const dbPort = port || '5432';
            
            rl.question('Database name (default: wandstudios): ', (dbName) => {
              const database = dbName || 'wandstudios';
              
              // Import the database
              try {
                console.log(\`Importing database from \${DUMP_FILE}...\`);
                
                // Set PGPASSWORD environment variable
                const env = { ...process.env, PGPASSWORD: password };
                
                // Command to import database
                const command = \`psql -h \${dbHost} -p \${dbPort} -U \${user} -d \${database} -f "\${DUMP_FILE}"\`;
                
                // Log the command (without password)
                console.log(\`Running: \${command}\`);
                
                // Execute psql
                execSync(command, { env, stdio: 'inherit' });
                
                console.log('\\nDatabase imported successfully!');
              } catch (error) {
                console.error('Error importing database:', error.message);
              }
              
              rl.close();
            });
          });
        });
      });
    });
  });
}

// Run the main function
main();
`;
  
  fs.writeFileSync(importScriptPath, scriptContent);
  console.log(`Created import script: ${importScriptPath}`);
  
  // Make the script executable
  try {
    fs.chmodSync(importScriptPath, 0o755);
  } catch (error) {
    // Windows doesn't support chmod, which is fine
  }
}

// Run the main function
main();