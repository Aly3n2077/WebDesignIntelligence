# W&D Studios - Replit Deployment Guide

## Overview
This guide covers deploying both the frontend and backend of the W&D Studios website on Replit's infrastructure.

## Prerequisites
- Your project is already on Replit
- PostgreSQL database is set up (automatically provided by Replit)
- Environment variables are configured in Replit Secrets

## Frontend + Backend Deployment

### 1. Environment Setup

Configure these environment variables in Replit Secrets:
```
NODE_ENV=production
DATABASE_URL=your-replit-postgres-url
```

### 2. Build Configuration
The project is already configured for production builds in `vite.config.ts` and will automatically:
- Build the React frontend
- Bundle the backend server
- Optimize assets

### 3. Deployment Steps

1. Open the Deployments tab in Replit
2. Select "Autoscale" deployment type
3. Configure deployment settings:
   - Machine Power: Based on your needs (Medium recommended)
   - Max Instances: Start with 1-3 based on expected traffic

The deployment will automatically:
- Build the frontend and backend
- Run database migrations
- Start the server on port 5000

### 4. Verification Steps

After deployment completes:
1. Visit your deployed URL
2. Test the contact form
3. Verify all animations and interactions
4. Check database connections
5. Monitor error logs

## Database Management

Replit provides a PostgreSQL database that's automatically configured. To manage it:

1. Access Database:
   - Use Replit's built-in Database tab
   - Or connect via provided credentials

2. Migrations:
   ```bash
   npm run db:push
   ```

## Monitoring & Maintenance

1. Use Replit's monitoring tools:
   - View application logs
   - Monitor resource usage
   - Track request metrics

2. Regular maintenance:
   - Keep dependencies updated
   - Monitor error logs
   - Backup database regularly

## Scaling

Replit's Autoscale feature automatically handles:
- Traffic spikes
- Load balancing
- Resource allocation

## Security

1. Environment Variables:
   - Store sensitive data in Replit Secrets
   - Never commit sensitive data

2. Database:
   - Use parameterized queries (already implemented)
   - Regular security updates
   - Automated backups

## Troubleshooting

Common issues and solutions:

1. Build Failures:
   - Check build logs
   - Verify dependencies
   - Review environment variables

2. Runtime Errors:
   - Check application logs
   - Verify database connection
   - Review recent changes

3. Performance Issues:
   - Monitor resource usage
   - Check database queries
   - Review asset sizes

For additional support, use Replit's built-in support resources.