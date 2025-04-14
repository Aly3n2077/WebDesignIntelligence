
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Create backup directories if they don't exist
mkdir -p db-backups
mkdir -p secrets-backup

# Get current timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Database backup function
backup_database() {
  echo -e "${GREEN}Starting database backup...${NC}"
  if pg_dump "$DATABASE_URL" > "db-backups/backup_${TIMESTAMP}.sql"; then
    echo -e "${GREEN}Database backup created successfully: db-backups/backup_${TIMESTAMP}.sql${NC}"
  else
    echo -e "${RED}Database backup failed${NC}"
    return 1
  fi
}

# Environment variables backup function
backup_env() {
  echo -e "${GREEN}Starting environment backup...${NC}"
  if [ -f .env ]; then
    cp .env "secrets-backup/.env_${TIMESTAMP}"
    echo -e "${GREEN}Environment backup created successfully: secrets-backup/.env_${TIMESTAMP}${NC}"
  else
    echo -e "${RED}No .env file found${NC}"
    return 1
  fi
}

# Main backup process
echo "Starting backup process..."

backup_database
backup_env

echo -e "${GREEN}Backup process completed!${NC}"
