#!/usr/bin/env node

/**
 * Environment Backup Script
 * 
 * This script creates a backup of your environment variables and encrypts it.
 * Usage: 
 *   - To create backup: node backup-env.js backup
 *   - To restore backup: node backup-env.js restore
 * 
 * IMPORTANT: Keep your password safe! If you lose it, you won't be able to restore your environment variables.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const readline = require('readline');

// Configuration
const BACKUP_FILE = path.join(__dirname, '../env-backup.enc');
const ENV_FILE = path.join(__dirname, '../.env');
const ALGORITHM = 'aes-256-cbc';

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Encrypts the content using the provided password
 */
function encrypt(text, password) {
  // Create a secure key from the password
  const key = crypto.scryptSync(password, 'salt', 32);
  // Generate a random initialization vector
  const iv = crypto.randomBytes(16);
  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  // Encrypt the text
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Return the IV and encrypted data
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypts the content using the provided password
 */
function decrypt(encryptedText, password) {
  try {
    // Split the IV and encrypted data
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    // Create a secure key from the password
    const key = crypto.scryptSync(password, 'salt', 32);
    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    // Decrypt
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption failed. Make sure the password is correct.');
    return null;
  }
}

/**
 * Creates a backup of the .env file
 */
function backupEnv() {
  if (!fs.existsSync(ENV_FILE)) {
    console.error('No .env file found.');
    process.exit(1);
  }

  rl.question('Enter a password to encrypt your environment variables: ', (password) => {
    if (!password || password.length < 8) {
      console.error('Password must be at least 8 characters long.');
      rl.close();
      return;
    }

    rl.question('Confirm password: ', (confirmPassword) => {
      if (password !== confirmPassword) {
        console.error('Passwords do not match.');
        rl.close();
        return;
      }

      // Read environment file
      const envContent = fs.readFileSync(ENV_FILE, 'utf8');
      
      // Encrypt the content
      const encrypted = encrypt(envContent, password);
      
      // Write to backup file
      fs.writeFileSync(BACKUP_FILE, encrypted);
      
      console.log(`\nBackup created and encrypted at: ${BACKUP_FILE}`);
      console.log('IMPORTANT: Keep your password safe! You will need it to restore your environment variables.');
      
      rl.close();
    });
  });
}

/**
 * Restores the .env file from backup
 */
function restoreEnv() {
  if (!fs.existsSync(BACKUP_FILE)) {
    console.error('No backup file found.');
    process.exit(1);
  }

  rl.question('Enter the password to decrypt your environment variables: ', (password) => {
    // Read encrypted backup
    const encryptedContent = fs.readFileSync(BACKUP_FILE, 'utf8');
    
    // Decrypt the content
    const decrypted = decrypt(encryptedContent, password);
    
    if (!decrypted) {
      rl.close();
      return;
    }
    
    // If .env already exists, ask for confirmation
    if (fs.existsSync(ENV_FILE)) {
      rl.question('\nWARNING: This will overwrite your existing .env file. Continue? (y/n): ', (answer) => {
        if (answer.toLowerCase() !== 'y') {
          console.log('Restore cancelled.');
          rl.close();
          return;
        }
        
        // Write to .env file
        fs.writeFileSync(ENV_FILE, decrypted);
        console.log('.env file has been restored successfully.');
        rl.close();
      });
    } else {
      // Write to .env file
      fs.writeFileSync(ENV_FILE, decrypted);
      console.log('.env file has been restored successfully.');
      rl.close();
    }
  });
}

// Main function
function main() {
  // Create scripts directory if it doesn't exist
  if (!fs.existsSync(path.dirname(BACKUP_FILE))) {
    fs.mkdirSync(path.dirname(BACKUP_FILE), { recursive: true });
  }

  // Parse command line arguments
  const command = process.argv[2];
  
  if (command === 'backup') {
    backupEnv();
  } else if (command === 'restore') {
    restoreEnv();
  } else {
    console.log('Usage: node backup-env.js [backup|restore]');
    rl.close();
  }
}

// Run the main function
main();