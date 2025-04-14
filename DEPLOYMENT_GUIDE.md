# W&D Studios - Deployment Guide

## Pre-Deployment Checklist
- [ ] Test all features
- [ ] Verify database connections
- [ ] Check environment variables
- [ ] Optimize assets
- [ ] Review security settings

## Environment Setup

1. Configure environment variables in Replit Secrets:
```
NODE_ENV=production
DATABASE_URL=your-postgresql-url
```

2. Database setup:
- Use Replit's built-in PostgreSQL database
- Or connect to external PostgreSQL service (See detailed options below)
- Run migrations: `npm run db:push`

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

## Deployment Steps

1. Push code to Replit repository

2. In Replit:
   - Configure environment variables in Secrets
   - Use the deploy button
   - Verify deployment logs

3. Post-deployment:
   - Test the live application
   - Verify database connections
   - Check form submissions
   - Monitor error logs


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


## Monitoring & Maintenance

1. Regular checks:
   - Application uptime
   - Database performance
   - Error logs
   - Form submissions

2. Updates:
   - Keep dependencies updated: `npm audit fix`
   - Monitor security advisories
   - Backup database regularly


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

Common issues and solutions:

1. Database Connection:
   - Verify DATABASE_URL
   - Check database permissions
   - Review connection logs

2. Application Errors:
   - Check Replit logs
   - Verify environment variables
   - Review recent changes

3. Performance Issues:
   - Monitor resource usage
   - Check database queries
   - Review asset sizes

For additional help, use Replit's support resources or contact the development team.

---

This guide covers the essentials for deploying the W&D Studios website. For specific questions or advanced configurations, please refer to the documentation of the respective services or consult with the development team.