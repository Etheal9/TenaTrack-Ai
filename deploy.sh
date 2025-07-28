#!/bin/bash

# Build Docker images
docker-compose build

# Start services
docker-compose up -d

# Wait for services to initialize
sleep 10

# Display deployment info
echo "Application deployed successfully!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000"
echo "Firestore Emulator: http://localhost:8080"