#!/bin/bash
# Stop the application if it's running via PM2
echo "Checking for existing PM2 process for blogapp..."
if pm2 list | grep -q "blogapp"; then # -q for quiet output
    echo "Stopping and deleting existing PM2 process..."
    pm2 stop blogapp || true # Use || true to prevent script failure if process isn't found
    pm2 delete blogapp || true
    pm2 save || true # Save PM2 configuration
else
    echo "PM2 process 'blogapp' not found or not running."
fi

# Clean up old deployment directories
echo "Cleaning up old deployment directories..."
DEPLOY_DIR="/home/ubuntu/your-mern-app/backend" # REPLACE 'your-mern-app' with your chosen app name
OLD_DEPLOY_DIR="/home/ubuntu/your-mern-app/backend_old" # REPLACE 'your-mern-app'

if [ -d "$DEPLOY_DIR" ]; then
    echo "Moving current deployment to old_deploy_dir..."
    rm -rf "$OLD_DEPLOY_DIR" # Remove any previous old backup
    mv "$DEPLOY_DIR" "$OLD_DEPLOY_DIR" || true # Move current to old
fi
# Ensure the new deployment directory exists and is empty
mkdir -p "$DEPLOY_DIR"
chown -R ubuntu:ubuntu "$DEPLOY_DIR" # Ensure correct ownership
echo "Directory cleanup complete."