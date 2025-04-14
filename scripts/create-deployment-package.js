#!/usr/bin/env node

/**
 * Deployment Package Creator
 * 
 * This script creates a secure deployment package for the W&D Studios website,
 * including all necessary files while excluding sensitive information.
 * 
 * Usage: node create-deployment-package.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');
const readline = require('readline');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'deployment');
const PACKAGE_NAME = 'w-and-d-studios-deployment';
const ENV_FILE = path.join(PROJECT_ROOT, '.env');
const ENV_EXAMPLE_FILE = path.join(PROJECT_ROOT, '.env.example');

// Files and directories to exclude from the package
const EXCLUDE_PATTERNS = [
  '.env',
  '.env.*',
  'node_modules',
  'dist',
  '.git',
  'env-backup.enc',
  'deployment',
  '*.log'
];

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Creates a deployment package
 */
function createDeploymentPackage() {
  console.log('Creating deployment package...');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Create the deployment package
  try {
    const excludeArgs = EXCLUDE_PATTERNS.map(pattern => `--exclude="${pattern}"`).join(' ');
    const packagePath = path.join(OUTPUT_DIR, `${PACKAGE_NAME}.tar.gz`);
    
    // Create the tar.gz archive
    execSync(
      `tar -czf "${packagePath}" ${excludeArgs} -C "${PROJECT_ROOT}" .`,
      { stdio: 'inherit' }
    );
    
    console.log(`\nDeployment package created at: ${packagePath}`);
    return packagePath;
  } catch (error) {
    console.error('Failed to create deployment package:', error);
    process.exit(1);
  }
}

/**
 * Creates a backup of the .env file if it exists
 */
function handleEnvironmentFile() {
  if (fs.existsSync(ENV_FILE)) {
    rl.question('Would you like to create an encrypted backup of your .env file? (y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        rl.question('Enter a password to encrypt your environment variables: ', (password) => {
          // Read environment file
          const envContent = fs.readFileSync(ENV_FILE, 'utf8');
          
          // Generate a secure key from the password
          const key = crypto.scryptSync(password, 'salt', 32);
          const iv = crypto.randomBytes(16);
          
          // Encrypt the content
          const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
          let encrypted = cipher.update(envContent, 'utf8', 'hex');
          encrypted += cipher.final('hex');
          
          // Create the encrypted file
          const encryptedFilePath = path.join(OUTPUT_DIR, 'env-secrets.enc');
          fs.writeFileSync(encryptedFilePath, iv.toString('hex') + ':' + encrypted);
          
          console.log(`\nEnvironment variables encrypted and saved to: ${encryptedFilePath}`);
          console.log('IMPORTANT: Keep your password safe! You will need it to decrypt the environment variables.');
          
          // Copy .env.example to the deployment package
          if (fs.existsSync(ENV_EXAMPLE_FILE)) {
            const examplePath = path.join(OUTPUT_DIR, '.env.example');
            fs.copyFileSync(ENV_EXAMPLE_FILE, examplePath);
            console.log(`\nCopied .env.example to: ${examplePath}`);
          }
          
          finishPackaging();
        });
      } else {
        finishPackaging();
      }
    });
  } else {
    finishPackaging();
  }
}

/**
 * Creates the final deployment package and provides instructions
 */
function finishPackaging() {
  // Create the deployment package
  const packagePath = createDeploymentPackage();
  
  // Create a README file with deployment instructions
  const readmePath = path.join(OUTPUT_DIR, 'DEPLOYMENT_INSTRUCTIONS.md');
  const readmeContent = `# W&D Studios - Deployment Instructions

This package contains everything needed to deploy the W&D Studios website.

## Contents

- \`${PACKAGE_NAME}.tar.gz\`: The main deployment package
- \`DEPLOYMENT_INSTRUCTIONS.md\`: This file
${fs.existsSync(path.join(OUTPUT_DIR, 'env-secrets.enc')) ? '- `env-secrets.enc`: Encrypted environment variables\n' : ''}${fs.existsSync(path.join(OUTPUT_DIR, '.env.example')) ? '- `.env.example`: Example environment configuration\n' : ''}

## Deployment Steps

1. Extract the deployment package:
   \`\`\`bash
   tar -xzf ${PACKAGE_NAME}.tar.gz -C /path/to/destination
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Setup environment variables:
   - Create a \`.env\` file based on \`.env.example\`
   ${fs.existsSync(path.join(OUTPUT_DIR, 'env-secrets.enc')) ? '- Or decrypt the provided environment variables:\n     ```bash\n     node scripts/decrypt-env.js env-secrets.enc .env\n     ```\n' : ''}

4. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

5. Start the production server:
   \`\`\`bash
   npm start
   \`\`\`

## Additional Notes

- Ensure PostgreSQL is installed and configured according to your \`.env\` file
- Run database migrations if needed: \`npm run db:push\`
- For more detailed instructions, refer to \`DOCUMENTATION.md\` in the extracted package

`;
  
  fs.writeFileSync(readmePath, readmeContent);
  console.log(`\nDeployment instructions written to: ${readmePath}`);
  
  // Create a simple script to decrypt environment variables
  if (fs.existsSync(path.join(OUTPUT_DIR, 'env-secrets.enc'))) {
    const decryptScriptPath = path.join(OUTPUT_DIR, 'decrypt-env.js');
    const decryptScriptContent = `#!/usr/bin/env node

/**
 * Environment Variables Decryption Script
 * 
 * Usage: node decrypt-env.js <encrypted-file> <output-file>
 * Example: node decrypt-env.js env-secrets.enc .env
 */

const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

// Check arguments
if (process.argv.length < 4) {
  console.error('Usage: node decrypt-env.js <encrypted-file> <output-file>');
  process.exit(1);
}

const encryptedFilePath = process.argv[2];
const outputFilePath = process.argv[3];

if (!fs.existsSync(encryptedFilePath)) {
  console.error(\`File not found: \${encryptedFilePath}\`);
  process.exit(1);
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Read encrypted file
const encryptedData = fs.readFileSync(encryptedFilePath, 'utf8');
const [ivHex, encrypted] = encryptedData.split(':');

rl.question('Enter password to decrypt environment variables: ', (password) => {
  try {
    // Generate key from password
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = Buffer.from(ivHex, 'hex');
    
    // Decrypt
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    // Write to output file
    fs.writeFileSync(outputFilePath, decrypted);
    console.log(\`Successfully decrypted to: \${outputFilePath}\`);
  } catch (error) {
    console.error('Decryption failed. Make sure the password is correct.');
  } finally {
    rl.close();
  }
});
`;
    
    fs.writeFileSync(decryptScriptPath, decryptScriptContent);
    console.log(`\nDecryption script written to: ${decryptScriptPath}`);
  }
  
  console.log('\nDeployment package creation completed!');
  console.log(`\nYou can find all deployment files in the '${path.relative(PROJECT_ROOT, OUTPUT_DIR)}' directory.`);
  
  rl.close();
}

// Main function
function main() {
  console.log('W&D Studios - Deployment Package Creator');
  console.log('=======================================\n');
  
  // Handle environment file
  handleEnvironmentFile();
}

// Run the main function
main();