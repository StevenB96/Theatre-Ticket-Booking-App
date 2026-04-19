#!/bin/sh
set -e

echo "⏳ Waiting for database..."

until nc -z "$MYSQL_HOST" "$MYSQL_PORT"; do
  sleep 1
done

echo "✅ Database is up"

echo "🔧 Running migrations..."
npm run migrate

echo "🌱 Running seeds..."
npm run seed || true

echo "🚀 Starting app..."
exec "$@"