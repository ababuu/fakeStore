"""
Seed the database with products from the FakeStore API.
Run from the server/ directory:
    python -m app.utils.seed
Idempotent — skips products that already exist.
"""
import sys
import os

# Allow running as a module from the server/ directory
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

import httpx
from sqlalchemy.orm import Session

from app.database import SessionLocal, engine
from app.models import Product, Category  # ensures tables are registered
from app.database import Base


FAKESTOREAPI_URL = "https://fakestoreapi.com/products"


def seed(db: Session) -> None:
    # Create tables if they don't exist yet (safe for dev; migrations handle prod)
    Base.metadata.create_all(bind=engine)

    print("Fetching products from FakeStore API...")
    response = httpx.get(FAKESTOREAPI_URL, timeout=15)
    response.raise_for_status()
    products: list[dict] = response.json()

    seeded = 0
    for p in products:
        # Ensure category row exists
        category_name: str = p["category"]
        if not db.query(Category).filter_by(name=category_name).first():
            db.add(Category(name=category_name))
            db.flush()

        # Skip if product already present (idempotent)
        if db.query(Product).filter_by(id=p["id"]).first():
            continue

        db.add(
            Product(
                id=p["id"],
                title=p["title"],
                price=p["price"],
                description=p["description"],
                category=p["category"],
                image=p["image"],
                rating_rate=p.get("rating", {}).get("rate", 0.0),
                rating_count=p.get("rating", {}).get("count", 0),
            )
        )
        seeded += 1

    db.commit()
    print(f"Done. {seeded} products seeded ({len(products) - seeded} already existed).")


if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed(db)
    finally:
        db.close()
