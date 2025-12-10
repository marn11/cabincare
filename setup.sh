#!/bin/bash

set -e

docker compose build

docker compose up -d

docker-compose exec backend run seed

echo "All services are up!"
echo "Frontend is at: http://localhost:3000"
echo "Backend is at: http://localhost:3001"