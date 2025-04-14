# W&D Studios - Local Development Guide

## Setup Requirements

1. Node.js (v18+)
2. PostgreSQL (v14+)
3. Git (optional)

## Installation Steps

1. Clone the repository (if using Git):
```bash
git clone <repository-url>
cd w-and-d-studios
```
Or extract the downloaded ZIP archive to a folder.

2. Install dependencies:
```bash
npm install
```

3. Configure PostgreSQL:
```sql
CREATE DATABASE wandstudios;
```

4. Environment setup:
```bash
# Copy example environment file
cp .env.example .env

# Update DATABASE_URL in .env:
DATABASE_URL=postgresql://username:password@0.0.0.0:5432/wandstudios
```

5. Initialize database:
```bash
npm run db:push
```

6. Start development server:
```bash
npm run dev
```

## Development Workflow

### Frontend Development
- Components in `/client/src/components`
- Styles with Tailwind CSS
- State management with React hooks
- Animations with Framer Motion

### Backend Development
- Express routes in `/server/routes.ts`
- Database operations with Drizzle ORM
- TypeScript for type safety

## Database Management

1. View/edit data:
   - Use pgAdmin or similar tool
   - Connect to your local database
   - Default port: 5432

2. Schema changes:
   - Edit `/shared/schema.ts`
   - Run `npm run db:push`

## Testing

1. Frontend:
   - Test components
   - Verify animations
   - Check responsive design

2. Backend:
   - Test API endpoints
   - Verify database operations
   - Check form submissions


## Common Issues

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

## Backing Up Environment Variables

For security, you can create encrypted backups of your environment variables:

```bash
# Create an encrypted backup
node scripts/backup-env.js backup

# Restore from backup
node scripts/backup-env.js restore
```

## Next Steps

After successful setup:

1. Explore the codebase to understand the application structure
2. Review the database schema in `shared/schema.ts`
3. Test the contact form and verify submissions are stored in your local database
4. Create a test user account if implementing authentication


---

This guide should help you get started with local development. For more detailed information about the application architecture and deployment, refer to the main `DOCUMENTATION.md` file.