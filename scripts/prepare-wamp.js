#!/usr/bin/env node

/**
 * WAMP Offline Development Preparation Script
 * 
 * This script prepares the W&D Studios project for offline development
 * using WAMP (Windows, Apache, MySQL, PHP) stack with PostgreSQL.
 * 
 * It creates a zip file with all necessary files, configuration guides,
 * and database setup scripts to work offline.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'wamp-offline');
const WAMP_CONFIG_FILE = path.join(OUTPUT_DIR, 'WAMP_SETUP.md');
const EXPORT_SCRIPT_FILE = path.join(OUTPUT_DIR, 'export-postgres-db.js');
const WAMP_ENV_FILE = path.join(OUTPUT_DIR, '.env.wamp');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Creates the output directory
 */
function createOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created directory: ${OUTPUT_DIR}`);
  }
}

/**
 * Creates a database export script for PostgreSQL
 */
function createDatabaseExportScript() {
  const scriptContent = `#!/usr/bin/env node

/**
 * PostgreSQL Database Export Script
 * 
 * This script exports the current PostgreSQL database to a SQL file
 * that can be imported into a local PostgreSQL instance.
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for database connection details
rl.question('Enter the DATABASE_URL or connection string: ', (dbUrl) => {
  if (!dbUrl) {
    console.error('Database URL is required');
    rl.close();
    return;
  }

  // Parse the connection URL to get details
  let dbUser, dbPassword, dbHost, dbPort, dbName;
  
  try {
    const url = new URL(dbUrl.startsWith('postgresql://') ? dbUrl : \`postgresql://\${dbUrl}\`);
    dbUser = url.username;
    dbPassword = url.password;
    dbHost = url.hostname;
    dbPort = url.port || '5432';
    dbName = url.pathname.slice(1); // Remove leading '/'
  } catch (error) {
    console.error('Invalid database URL format. Expected: postgresql://user:password@host:port/dbname');
    rl.close();
    return;
  }

  // Output file
  const outputFile = path.join(__dirname, 'database_dump.sql');
  
  try {
    console.log('Exporting database...');
    
    // Use pg_dump to export the database
    const command = \`pg_dump -h \${dbHost} -p \${dbPort} -U \${dbUser} -d \${dbName} -f "\${outputFile}"\`;
    
    console.log(\`Running: \${command.replace(dbPassword, '********')}\`);
    
    // Set PGPASSWORD environment variable
    const env = { ...process.env, PGPASSWORD: dbPassword };
    
    // Execute pg_dump
    execSync(command, { env });
    
    console.log(\`Database exported successfully to: \${outputFile}\`);
  } catch (error) {
    console.error('Error exporting database:', error.message);
  }
  
  rl.close();
});
`;

  fs.writeFileSync(EXPORT_SCRIPT_FILE, scriptContent);
  console.log(`Created database export script: ${EXPORT_SCRIPT_FILE}`);
}

/**
 * Creates WAMP configuration guide
 */
function createWampConfigGuide() {
  const guideContent = `# W&D Studios - WAMP Offline Development Setup

This guide provides detailed instructions for setting up the W&D Studios project for offline development using WAMP stack with PostgreSQL.

## Prerequisites

1. **WAMP Server**
   - Download and install WAMP Server from [wampserver.com](https://www.wampserver.com/)
   - Ensure Apache and PHP are configured correctly

2. **PostgreSQL for Windows**
   - Download and install PostgreSQL from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
   - Remember your superuser (postgres) password during installation
   - Add PostgreSQL bin directory to your system PATH (usually C:\\Program Files\\PostgreSQL\\14\\bin)

3. **Node.js for Windows**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/) (LTS version recommended)

## Setup Steps

### 1. Install PostgreSQL and Create Database

1. Open pgAdmin (installed with PostgreSQL)
2. Connect to your local PostgreSQL server
3. Create a new database called 'wandstudios'
4. If you have an existing database dump:
   - Open a command prompt and navigate to the directory containing the dump file
   - Run: \`psql -U postgres -d wandstudios -f database_dump.sql\`
   - When prompted, enter your PostgreSQL password

### 2. Project Setup

1. Extract this ZIP file to your WAMP www directory (usually C:\\wamp64\\www\\w-and-d-studios)
2. Open a command prompt and navigate to the project directory
3. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

### 3. Environment Configuration

1. Copy the provided .env.wamp file to .env:
   \`\`\`
   copy .env.wamp .env
   \`\`\`
2. Edit the .env file if necessary to match your local PostgreSQL settings

### 4. Database Migration

Run the database migration script to create the tables:
\`\`\`
node scripts/db-push.js
\`\`\`

### 5. Running the Application

1. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`
2. Access the application at http://localhost:5000

## Working with a Local Database

### Exporting Your Online Database for Offline Use

If you have data in your online database that you want to use offline:

1. Run the provided export script:
   \`\`\`
   node export-postgres-db.js
   \`\`\`
2. Follow the prompts to enter your online database connection string
3. Import the resulting SQL file to your local PostgreSQL database

### Working with pgAdmin

1. Open pgAdmin to manage your local database
2. Connect to your local PostgreSQL server
3. Navigate to wandstudios database to view tables and data

## Troubleshooting

### Common Issues:

#### PostgreSQL Connection Issues
- Make sure PostgreSQL service is running: 
  - Open Services (services.msc)
  - Find PostgreSQL service and ensure it's "Running"
- Check connection settings in your .env file:
  - Verify username, password, port (default 5432)
  - Make sure database name is correct

#### Node.js/npm Issues
- Check Node.js installation: \`node -v\` and \`npm -v\`
- Try clearing npm cache: \`npm cache clean --force\`
- Make sure all dependencies are installed: \`npm install\`

#### Server Won't Start
- Check if port 5000 is already in use
  - Use \`netstat -ano | findstr :5000\` to find processes using port 5000
  - Change the PORT in your .env file if needed

## Syncing Back to Online

When you're ready to sync your changes back to the online environment:

1. Commit your code changes to version control
2. If you've made database changes, use the migration scripts
3. If you need to move data, export your local database and import it online

For more detailed information, refer to the main DOCUMENTATION.md and OFFLINE_DEV_GUIDE.md files.
`;

  fs.writeFileSync(WAMP_CONFIG_FILE, guideContent);
  console.log(`Created WAMP configuration guide: ${WAMP_CONFIG_FILE}`);
}

/**
 * Creates WAMP-specific .env file
 */
function createWampEnvFile() {
  const envContent = `# W&D Studios WAMP Configuration
NODE_ENV=development
PORT=5000
HOST=0.0.0.0

# Local PostgreSQL Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/wandstudios

# Change the password above to match your local PostgreSQL password
`;

  fs.writeFileSync(WAMP_ENV_FILE, envContent);
  console.log(`Created WAMP environment file: ${WAMP_ENV_FILE}`);
}

/**
 * Creates a ZIP file with all necessary files for WAMP
 */
function createWampZipFile() {
  try {
    // Copy required documentation files
    const filesToCopy = [
      'DOCUMENTATION.md',
      'OFFLINE_DEV_GUIDE.md',
      '.env.example',
      'package.json',
      'package-lock.json'
    ];
    
    for (const file of filesToCopy) {
      const sourcePath = path.join(PROJECT_ROOT, file);
      const destPath = path.join(OUTPUT_DIR, file);
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${file} to output directory`);
      }
    }
    
    // Create a ZIP file of the project for WAMP
    console.log('Creating ZIP file for WAMP...');
    const zipFileName = 'w-and-d-studios-wamp.zip';
    const zipFilePath = path.join(OUTPUT_DIR, zipFileName);
    
    // Create an exclusion list for the ZIP file
    const excludePatterns = [
      'node_modules',
      '.git',
      'dist',
      'wamp-offline'
    ].map(pattern => `--exclude="${pattern}"`).join(' ');
    
    // Create the ZIP file
    execSync(`cd "${PROJECT_ROOT}" && tar -czf "${zipFilePath}" ${excludePatterns} .`);
    console.log(`Created ZIP file: ${zipFilePath}`);
    
    return zipFilePath;
  } catch (error) {
    console.error('Error creating WAMP ZIP file:', error);
    return null;
  }
}

/**
 * Create a PostgreSQL compatible SQL file
 */
function createSqlSetupFile() {
  const sqlContent = `-- W&D Studios Database Setup for PostgreSQL
-- Run this script on your local PostgreSQL server to set up the database

-- Create the database if it doesn't exist
-- (Run this part separately as superuser)
-- CREATE DATABASE wandstudios;

-- Connect to the database
\\c wandstudios;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Add any sample data if needed
-- INSERT INTO users (username, password_hash) VALUES ('admin', 'hashed_password_here');

-- Grant permissions if needed for your local user
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_local_user;
`;

  const sqlFilePath = path.join(OUTPUT_DIR, 'database_setup.sql');
  fs.writeFileSync(sqlFilePath, sqlContent);
  console.log(`Created SQL setup file: ${sqlFilePath}`);
}

/**
 * Main function
 */
function main() {
  console.log('W&D Studios - WAMP Offline Development Preparation');
  console.log('================================================\n');
  
  // Create output directory
  createOutputDir();
  
  // Create configuration files
  createWampConfigGuide();
  createWampEnvFile();
  createDatabaseExportScript();
  createSqlSetupFile();
  
  // Create ZIP file
  const zipFilePath = createWampZipFile();
  
  if (zipFilePath) {
    console.log('\nWAMP offline development package created successfully!');
    console.log(`\nTo use the package:`);
    console.log(`1. Copy the contents of the '${path.relative(PROJECT_ROOT, OUTPUT_DIR)}' directory to your WAMP server`);
    console.log(`2. Extract the ZIP file in your WAMP www directory`);
    console.log(`3. Follow the instructions in WAMP_SETUP.md`);
  }
  
  rl.close();
}

// Run the main function
main();