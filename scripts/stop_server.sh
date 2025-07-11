#!/bin/bash
echo "Checking for PM2 process to stop..."
if pm2 list | grep -q "blogapp"; then
    echo "Stopping and deleting PM2 process 'blogapp'..."
    pm2 stop blogapp
    pm2 delete blogapp
    pm2 save || true # Save PM2 configuration after deleting
    echo "Application stopped."
else
    echo "PM2 process 'blogapp' not found or not running. Nothing to stop."
fi