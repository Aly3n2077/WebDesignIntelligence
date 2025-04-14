# W&D Studios Website Documentation

## Overview
A modern web application showcasing AI and design services with a strong visual identity and parent company (MILLI) integration. The website features various sections including:

- Hero/Banner
- About
- Services
- Portfolio
- Team
- Contact Form
- Call to Action

## Tech Stack

### Frontend
- React with TypeScript 
- Tailwind CSS
- Shadcn UI Components
- Framer Motion animations
- TanStack Query
- Wouter for routing

### Backend
- Node.js/Express
- PostgreSQL with Drizzle ORM
- TypeScript

## Development

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+) - Only required for offline development
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd w-and-d-studios
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   - Update the values in `.env` file according to your local setup

4. **Start development server**
   ```bash
   npm run dev
   ```
   - This will start both the backend Express server and frontend Vite development server
   - The application will be available at `http://0.0.0.0:5000`

## Project Structure

### Frontend (/client)
- `/src/components` - UI components
- `/src/lib` - Utilities and data
- `/src/pages` - Page components
- `/src/hooks` - Custom React hooks

### Backend (/server)
- `index.ts` - Server entry point
- `routes.ts` - API routes
- `db.ts` - Database configuration
- `config.ts` - Server configuration


## Features
- Responsive design
- Form validation
- Animation effects
- Contact form with database storage
- Team member profiles
- Services showcase
- Portfolio display

## Database
Uses PostgreSQL with Drizzle ORM for:
- Contact form submissions
- Data storage and retrieval

### Database Operations
- **Running migrations**: `npm run db:push`
- **Viewing database structure**: `npm run db:studio` (starts Drizzle Studio)

### Working Offline vs. Online
The application automatically detects the environment:
- **Online (with DATABASE_URL)**: Connects to the provided PostgreSQL database (like Neon)
- **Offline (without DATABASE_URL)**: Falls back to a local PostgreSQL instance

### Exporting/Importing Database

To migrate data between online and offline environments:

1. **Export database for offline development**:
   ```bash
   node scripts/db-export.js
   ```
   This creates a SQL dump file and an import script for easy restoration.

2. **Import database to local PostgreSQL**:
   ```bash
   # Using the generated import script
   node db-backups/wandstudios-[timestamp]-import.js

   # Or directly with psql
   psql -U postgres -d wandstudios -f db-backups/wandstudios-[timestamp].sql
   ```

For WAMP users, these operations are covered in the WAMP preparation script.


## Deployment
The application is configured for deployment on Replit:

1. **Environment Setup**
   - Ensure PostgreSQL database is provisioned in Replit
   - The DATABASE_URL environment variable should be automatically populated

2. **Deploy Steps**
   - Use the deploy button in the Replit interface
   - The deployment will automatically:
     - Build the application
     - Run the database migrations
     - Start the server

3. **Post-Deployment Verification**
   - Verify the deployed URL is accessible
   - Test the contact form submission
   - Check database connections

### Alternative Deployment Options

#### Deploying to Vercel/Netlify (Frontend) + Railway/Render (Backend)

1. **Frontend Deployment**
   - Configure build settings:
     ```
     Build Command: npm run build
     Output Directory: dist
     ```
   - Add environment variables:
     - `VITE_API_URL`: URL of your deployed backend API

2. **Backend Deployment**
   - Deploy server code to Railway, Render, or similar
   - Configure environment variables:
     - `DATABASE_URL`: PostgreSQL connection string
     - `NODE_ENV`: production
   - Set up build commands:
     ```
     Build Command: npm install
     Start Command: node server/index.js
     ```

3. **Database Provisioning**
   - Create a PostgreSQL database in your preferred provider
   - Update the DATABASE_URL environment variable in your backend deployment


## Environment Variables

### Required Variables
- `DATABASE_URL`: PostgreSQL connection string (required for production)
- `NODE_ENV`: Set to 'development' or 'production'

### Optional Variables
- `PORT`: Server port (defaults to 5000)
- `HOST`: Server host (defaults to 0.0.0.0)

## Security Considerations

1. **Environment Variables**
   - Never commit .env files to version control
   - Use .env.example for documenting required environment variables

2. **API Security**
   - The server implements proper error handling
   - Form submissions validate inputs using Zod schemas

3. **Database Security**
   - Use parameterized queries (automatic with Drizzle ORM)
   - Restrict database user permissions in production

4. **Frontend Security**
   - No sensitive data is stored in the frontend
   - API calls use proper error handling

---

This documentation provides a comprehensive guide to developing and deploying the W&D Studios website. For additional questions or troubleshooting, please contact the development team.