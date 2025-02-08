#!/bin/sh
set -e

echo "Running database migrations..."
alembic upgrade head

echo "Seeding products..."
python -c "
from app.database import SessionLocal
from app.utils.seed import seed
db = SessionLocal()
try:
    seed(db)
    db.commit()
finally:
    db.close()
"

echo "Starting server..."
exec uvicorn main:app --host 0.0.0.0 --port 8000
