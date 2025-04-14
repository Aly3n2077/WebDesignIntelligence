# W&D Studios Website - Development & Deployment Documentation

This document provides comprehensive instructions for both local development and production deployment of the W&D Studios website.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Local Development](#local-development)
4. [Database Setup](#database-setup)
5. [Deployment](#deployment)
6. [Environment Variables](#environment-variables)
7. [Security Considerations](#security-considerations)

## Project Overview

W&D Studios (WebIt and DesignIt Studios Inc.) is a digital platform that showcases AI and design services with a strong visual identity and parent company (MILLI) integration. The website features various sections including:

- Hero/Banner
- About
- Services
- Portfolio
- Team
- Contact Form
- Call to Action

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS
- Shadcn UI Components
- Framer Motion for animations
- TanStack React Query for data fetching
- Wouter for routing

### Backend
- Node.js with Express
- PostgreSQL database
- Drizzle ORM for database interactions
- TypeScript

### Development Tools
- Vite for frontend development
- TSX for TypeScript execution
- Drizzle Kit for schema migrations

## Local Development

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+) - Only required for offline development
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd w-and-d-studios
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   - Update the values in `.env` file according to your local setup

4. **Configure local database (for offline development)**
   - Create a PostgreSQL database:
   ```bash
   createdb wandstudios
   ```
   - Or using PostgreSQL commands:
   ```sql
   CREATE DATABASE wandstudios;
   ```
   - Update the DATABASE_URL in your .env file with your local PostgreSQL connection string:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/wandstudios
   ```

5. **Run database migrations**
   ```bash
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   - This will start both the backend Express server and frontend Vite development server
   - The application will be available at `http://localhost:5000`

## Database Setup

The application uses Drizzle ORM with PostgreSQL. The schema is defined in `shared/schema.ts`.

### Schema Structure
- `users`: User authentication table
- `contact_submissions`: Stores contact form submissions

### Database Operations
- **Running migrations**: `npm run db:push`
- **Viewing database structure**: `npm run db:studio` (starts Drizzle Studio)

### Working Offline vs. Online
The application automatically detects the environment:
- **Online (with DATABASE_URL)**: Connects to the provided PostgreSQL database (like Neon)
- **Offline (without DATABASE_URL)**: Falls back to a local PostgreSQL instance

## Deployment

### Replit Deployment

The project is configured for seamless deployment on Replit:

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