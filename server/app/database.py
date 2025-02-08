import os
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from app.config import settings

# Resolve relative SQLite paths against the server/ directory so the DB
# location is stable regardless of which directory uvicorn is started from.
_SERVER_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def _resolve_db_url(url: str) -> str:
    prefix = "sqlite:///./"
    if url.startswith(prefix):
        db_filename = url[len(prefix):]
        abs_path = os.path.join(_SERVER_DIR, db_filename)
        return f"sqlite:///{abs_path}"
    return url


_db_url = _resolve_db_url(settings.DATABASE_URL)

engine = create_engine(
    _db_url,
    connect_args={"check_same_thread": False} if _db_url.startswith("sqlite") else {},
)

# Enforce foreign key constraints for SQLite
if settings.DATABASE_URL.startswith("sqlite"):
    @event.listens_for(engine, "connect")
    def set_sqlite_pragma(dbapi_conn, _connection_record):
        cursor = dbapi_conn.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
