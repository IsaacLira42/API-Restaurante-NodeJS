#!/bin/sh
set -e

echo "Applying database migrations..."
npx prisma migrate deploy

echo "Seeding database..."
node dist/prisma/seed.js

echo "Starting application..."
exec "$@"


