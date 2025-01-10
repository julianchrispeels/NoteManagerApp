#!/bin/bash

echo "Starting the frontend..."
cd ./frontend || { echo "Error: Could not access the frontend folder"; exit 1; }
npm start &
frontend_pid=$!

echo "Starting the backend..."
cd ../backend || { echo "Error: Could not access the backend folder"; exit 1; }
npm run dev &
backend_pid=$!

cleanup() {
    echo "Stopping processes..."
    kill "$frontend_pid" "$backend_pid" 2>/dev/null
    echo "Processes stopped. Exiting."
    exit
}

trap cleanup SIGINT SIGTERM

wait