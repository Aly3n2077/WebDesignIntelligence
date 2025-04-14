# W&D Studios - WAMP Setup Guide

This guide provides comprehensive instructions for setting up the W&D Studios platform in a WAMP (Windows, Apache, MySQL, PHP) environment with PostgreSQL for offline development.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installing PostgreSQL on Windows](#installing-postgresql-on-windows)
3. [Setting Up the Project](#setting-up-the-project)
4. [Database Configuration](#database-configuration)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following software installed on your Windows system:

1. **WAMP Server**
   - Download from: [wampserver.com](https://www.wampserver.com/)
   - Includes Apache, MySQL, and PHP

2. **Node.js**
   - Download from: [nodejs.org](https://nodejs.org/) (LTS version recommended)
   - Verify installation with: `node -v` and `npm -v`

3. **PostgreSQL**
   - Required instead of MySQL for this project
   - Installation instructions are in the next section

4. **Git** (optional)
   - Download from: [git-scm.com](https://git-scm.com/downloads)
   - Useful for version control but not required

## Installing PostgreSQL on Windows

PostgreSQL is required for this project. Follow these steps to install it:

1. **Download PostgreSQL**
   - Visit [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
   - Download the installer for the latest version (14+ recommended)

2. **Run the Installer**
   - Launch the downloaded installer
   - Accept the terms and choose an installation directory
   - **Important**: Remember the password you set for the postgres superuser!

3. **Installation Options**
   - Select components to install (at minimum, select the PostgreSQL Server, pgAdmin, and Command Line Tools)
   - Choose a data directory (default is fine)
   - Set a password for the postgres superuser
   - Keep the default port (5432)
   - Choose the default locale

4. **Verify Installation**
   - After installation completes, open pgAdmin from the Start menu
   - Connect to the PostgreSQL server with your password
   - You should see the default postgres database

5. **Add PostgreSQL to PATH**
   - Right-click on 'This PC' and select 'Properties'
   - Click on 'Advanced system settings'
   - Click 'Environment Variables'
   - Edit the 'Path' variable and add the PostgreSQL bin directory (typically `C:\Program Files\PostgreSQL\14\bin`)
   - Click 'OK' to save changes

## Setting Up the Project

Now that you have WAMP and PostgreSQL installed, follow these steps to set up the W&D Studios project:

1. **Extract Project Files**
   - Use the provided preparation script to create a WAMP-compatible package:
     ```
     node scripts/prepare-wamp.js
     ```
   - Extract the generated ZIP file (found in the 'wamp-offline' directory) to your WAMP www directory (typically `C:\wamp64\www\w-and-d-studios`)

2. **Install Node.js Dependencies**
   - Open a command prompt (run as administrator for best results)
   - Navigate to your project directory:
     ```
     cd C:\wamp64\www\w-and-d-studios
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - This may take a few minutes to complete

## Database Configuration

1. **Create the Database**
   - Open pgAdmin from the Start menu
   - Connect to your PostgreSQL server
   - Right-click on 'Databases' and select 'Create > Database'
   - Name the database 'wandstudios' and click 'Save'

2. **Configure Environment Variables**
   - Copy the provided .env.wamp file to .env:
     ```
     copy .env.wamp .env
     ```
   - Edit the .env file to match your PostgreSQL setup:
     ```
     DATABASE_URL=postgresql://postgres:your_password@localhost:5432/wandstudios
     ```
     (Replace 'your_password' with the password you set during PostgreSQL installation)

3. **Run Migrations**
   - Execute the database migration script to create tables:
     ```
     node scripts/db-push.js
     ```
   - Verify the tables were created by checking in pgAdmin

## Running the Application

1. **Start the Development Server**
   - From your project directory, run:
     ```
     npm run dev
     ```
   - You should see output indicating the server is running

2. **Access the Application**
   - Open a web browser and navigate to:
     ```
     http://localhost:5000
     ```
   - The W&D Studios website should load successfully

3. **Testing the Application**
   - Navigate to the Contact section of the website
   - Fill out and submit the form
   - Verify data is stored by checking the 'contact_submissions' table in pgAdmin

## Troubleshooting

### Common Issues and Solutions

#### PostgreSQL Connection Issues

**Error**: "Could not connect to PostgreSQL server"
- **Solution**:
  - Verify PostgreSQL service is running:
    - Open Services (Win+R, then type 'services.msc')
    - Find 'postgresql-x64-14' (or similar) and ensure it's 'Running'
  - Check your connection string in the .env file
  - Try connecting with psql to test credentials:
    ```
    psql -U postgres -h localhost -d wandstudios
    ```

#### Port Conflicts

**Error**: "Port 5000 already in use"
- **Solution**:
  - Find which process is using the port:
    ```
    netstat -ano | findstr :5000
    ```
  - Either stop that process or change the port in your .env file:
    ```
    PORT=3000
    ```

#### Node.js/npm Issues

**Error**: "npm command not found" or dependency errors
- **Solution**:
  - Verify Node.js installation: `node -v`
  - Try reinstalling dependencies:
    ```
    rm -rf node_modules
    npm cache clean --force
    npm install
    ```

#### Database Migration Errors

**Error**: "Error running migrations"
- **Solution**:
  - Check the database connection string
  - Verify the user has privileges to create tables
  - Manually create tables using the provided SQL script in 'database_setup.sql'

## Importing/Exporting Data

### Exporting From Online to Offline

1. Use the provided export script to get data from your online database:
   ```
   node export-postgres-db.js
   ```

2. Follow the prompts to specify your online database credentials

3. Import the resulting SQL file to your local PostgreSQL:
   ```
   psql -U postgres -d wandstudios -f database_dump.sql
   ```

### Exporting From Offline to Online

When moving back online, you may want to export your local data:

1. Export your local database:
   ```
   pg_dump -U postgres -d wandstudios -f local_database_dump.sql
   ```

2. Import this file to your online database through your hosting provider's tools

## Additional Resources

- PostgreSQL Documentation: [postgresql.org/docs/](https://www.postgresql.org/docs/)
- WAMP Server Documentation: [wampserver.aviatechno.net](https://wampserver.aviatechno.net/)
- Node.js Documentation: [nodejs.org/en/docs/](https://nodejs.org/en/docs/)

---

This guide should help you set up and run the W&D Studios platform in a WAMP environment with PostgreSQL. For additional help or specific issues, refer to the main documentation or contact the development team.