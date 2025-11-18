#!/bin/sh
set -e

echo "Building Next.js application..."
npm run build

echo "Starting production server..."
exec npm run start