# W&D Studios - Secure Deployment Guide

This guide provides detailed instructions for securely deploying the W&D Studios website to production environments.

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Database Setup](#database-setup)
3. [Environment Configuration](#environment-configuration)
4. [Deployment Options](#deployment-options)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Security Best Practices](#security-best-practices)
7. [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

Before deploying to production, ensure you have completed the following steps:

- [ ] All features have been tested thoroughly in development
- [ ] Database schema is finalized and migrations are working correctly
- [ ] Frontend assets are optimized (images, JS, CSS)
- [ ] Environment variables are prepared for production
- [ ] API endpoints are properly secured
- [ ] Performance testing has been conducted

## Database Setup

### Option 1: Neon PostgreSQL (Recommended)

1. Create an account at [Neon](https://neon.tech/)
2. Create a new PostgreSQL database project
3. Obtain the connection string from the dashboard
4. Add the connection string to your production environment variables as `DATABASE_URL`

### Option 2: Self-Hosted PostgreSQL

1. Set up a PostgreSQL server (v14+ recommended)
2. Create a database and user with appropriate permissions:
   ```sql
   CREATE DATABASE wandstudios;
   CREATE USER wanduser WITH ENCRYPTED PASSWORD 'strong-password';
   GRANT ALL PRIVILEGES ON DATABASE wandstudios TO wanduser;
   ```
3. Configure your connection string:
   ```
   DATABASE_URL=postgresql://wanduser:strong-password@your-db-host:5432/wandstudios
   ```
4. Ensure your database is properly secured (firewall rules, SSL, etc.)

### Database Migration

Once your database is set up, run the migrations:

```bash
# Using the helper script
node scripts/db-push.js

# Or directly if environment is already configured
npm run db:push
```

## Environment Configuration

Create a production `.env` file with the following variables:

```
# Required
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database

# Optional
PORT=5000
HOST=0.0.0.0
```

### Securely Managing Secrets

For secure management of production secrets:

1. **Never commit secrets to version control**
2. Use the provided encryption tools:
   ```bash
   # Backup and encrypt current environment
   node scripts/backup-env.js backup
   
   # Create a deployment package with encrypted secrets
   node scripts/create-deployment-package.js
   ```
3. Consider using a secrets management service like:
   - AWS Secrets Manager
   - Google Secret Manager
   - HashiCorp Vault
   - Vercel/Netlify Environment Variables

## Deployment Options

### Option 1: Replit Deployment (Simplest)

1. Push your code to a repository connected to your Replit account
2. Configure environment variables in Replit's Secrets tab
3. Use the deploy button in the Replit interface

### Option 2: Traditional VPS Deployment

1. Provision a VPS (Digital Ocean, AWS EC2, etc.)
2. Clone your repository to the server
3. Install Node.js (v18+)
4. Install dependencies: `npm install --production`
5. Build the application: `npm run build`
6. Set up environment variables
7. Start the server: `npm start`
8. Configure a process manager (PM2, systemd) to keep the app running
9. Set up a reverse proxy (Nginx, Apache) with SSL

Example Nginx configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Redirect HTTP to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Option 3: Containerized Deployment

1. Create a Dockerfile in your project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
```

2. Build and push the Docker image:
```bash
docker build -t w-and-d-studios:latest .
docker tag w-and-d-studios:latest yourregistry/w-and-d-studios:latest
docker push yourregistry/w-and-d-studios:latest
```

3. Deploy to your container platform (Kubernetes, ECS, etc.)

### Option 4: Serverless Deployment

For frontend:
1. Build the frontend: `npm run build`
2. Deploy the `dist` directory to a static hosting provider (Vercel, Netlify, S3+CloudFront)

For backend:
1. Deploy the Express app to a serverless platform (Vercel Functions, AWS Lambda, Cloud Run)
2. Configure environment variables in the platform's dashboard

## Post-Deployment Verification

After deployment, verify:

1. The website loads correctly on the production URL
2. All API endpoints are functioning
3. Contact form submissions are stored correctly in the database
4. No errors appear in your logs or browser console
5. The site works on different browsers and devices
6. The database connection is stable

## Security Best Practices

Ensure your production deployment follows these security practices:

1. **Use HTTPS everywhere**
   - Obtain an SSL certificate (Let's Encrypt is free)
   - Configure your server to redirect HTTP to HTTPS
   - Use HSTS headers to enforce HTTPS

2. **Implement proper headers**
   ```javascript
   // Add to your Express app
   app.use(helmet()); // Requires installing the 'helmet' package
   ```

3. **Rate limiting**
   - Implement rate limiting for API endpoints, especially for form submissions
   - Consider using the 'express-rate-limit' package

4. **Database security**
   - Use a strong, unique password for your database
   - Restrict network access to your database (VPC, firewall)
   - Create least-privilege database users
   - Regularly backup your database

5. **Regular updates**
   - Keep dependencies updated: `npm audit fix`
   - Update Node.js to the latest LTS version
   - Apply security patches to your server OS

6. **Monitoring and logging**
   - Implement application monitoring
   - Set up error tracking
   - Configure log rotation and retention

## Troubleshooting

### Common Issues and Solutions

**Database Connection Errors**
- Verify your DATABASE_URL is correct
- Check if your database is accessible from your deployment environment
- Ensure you have the proper credentials and permissions

**Application Won't Start**
- Check the logs: `journalctl -u your-service-name` (for systemd)
- Verify all environment variables are set correctly
- Ensure the build process completed successfully

**Frontend Assets Not Loading**
- Check your browser console for 404 errors
- Verify the build process created all necessary files
- Check your reverse proxy configuration

**Performance Issues**
- Optimize frontend assets (compression, minification)
- Configure proper caching headers
- Consider adding a CDN for static assets
- Scale your database if it becomes a bottleneck

### Getting Help

If you encounter issues that aren't covered in this guide:

1. Check the application logs for detailed error messages
2. Consult the documentation of the specific service or platform you're using
3. Reach out to the development team with specific error details and steps to reproduce

---

This guide covers the essentials for securely deploying the W&D Studios website. For specific questions or advanced configurations, please refer to the documentation of the respective services or consult with the development team.