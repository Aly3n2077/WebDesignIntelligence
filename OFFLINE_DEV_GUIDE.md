# W&D Studios - Offline Development Guide

This guide provides detailed instructions for setting up and running the W&D Studios website in an offline development environment.

## Prerequisites

Before starting, ensure you have the following installed on your system:

1. **Node.js and npm** (v18+ recommended)
   - Download from: [https://nodejs.org/](https://nodejs.org/)
   - Verify installation with: `node -v` and `npm -v`

2. **PostgreSQL** (v14+ recommended)
   - Download from: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
   - Or use a package manager like Homebrew: `brew install postgresql`
   - Verify installation with: `psql --version`

3. **Git** (optional but recommended)
   - Download from: [https://git-scm.com/downloads](https://git-scm.com/downloads)
   - Verify installation with: `git --version`

## Setup Steps

### 1. Clone or Download the Project

If using Git:
```bash
git clone <repository-url>
cd w-and-d-studios
```

Or extract the downloaded ZIP archive to a folder.

### 2. Install Dependencies

Navigate to the project directory and run:
```bash
npm install
```

This will install all required dependencies for both frontend and backend.

### 3. Set Up the Local Database

#### a. Create a PostgreSQL Database

Using the PostgreSQL command-line tools:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create a new database
CREATE DATABASE wandstudios;

# Exit PostgreSQL
\q
```

Or using pgAdmin or another PostgreSQL GUI tool, create a new database named `wandstudios`.

#### b. Configure Connection

Create a `.env` file in the project root directory by copying the example file:
```bash
cp .env.example .env
```

Edit the `.env` file to include your local database connection:
```
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/wandstudios
```

Replace `username` and `password` with your PostgreSQL credentials.

### 4. Initialize the Database Schema

Run the database migration command to create the required tables:
```bash
npm run db:push
```

This will set up all the necessary database tables according to the schemas defined in `shared/schema.ts`.

### 5. Start the Development Server

Run the development server with:
```bash
npm run dev
```

This will start both the backend Express server and the frontend Vite development server. The application will be accessible at `http://localhost:5000`.

## Working Offline

The application is configured to work seamlessly offline:

1. **Database Connection**:
   - The system will automatically use your local PostgreSQL database as specified in the `.env` file
   - You can view and manage database entries using tools like pgAdmin, DBeaver, or Drizzle Studio

2. **API Endpoints**:
   - All API endpoints will function normally, connecting to your local database
   - The frontend will communicate with the local backend using relative URLs

3. **Development Experience**:
   - Hot module reloading is enabled for frontend development
   - Backend changes will restart the server automatically

## Backing Up Environment Variables

For security, you can create encrypted backups of your environment variables:

```bash
# Create an encrypted backup
node scripts/backup-env.js backup

# Restore from backup
node scripts/backup-env.js restore
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection problems:

1. **Verify PostgreSQL is running**:
   ```bash
   # On Linux/macOS
   ps aux | grep postgres
   
   # On Windows
   tasklist | findstr postgres
   ```

2. **Test direct connection**:
   ```bash
   psql -U username -d wandstudios
   ```

3. **Check connection string** in your `.env` file:
   - Format should be: `postgresql://username:password@localhost:5432/wandstudios`
   - Ensure username and password are correct
   - Check that the database name matches the one you created

### Server Start-up Problems

If the server fails to start:

1. **Check for port conflicts**:
   - Ensure port 5000 is not in use by another application
   - You can change the port in the `.env` file if needed

2. **Verify dependencies**:
   ```bash
   npm install
   ```

3. **Check logs**:
   - Look for error messages in the console output
   - Node.js or database-specific errors will be displayed here

## Next Steps

After successful setup:

1. Explore the codebase to understand the application structure
2. Review the database schema in `shared/schema.ts`
3. Test the contact form and verify submissions are stored in your local database
4. Create a test user account if implementing authentication

---

This guide should help you get started with offline development. For more detailed information about the application architecture and deployment, refer to the main `DOCUMENTATION.md` file.