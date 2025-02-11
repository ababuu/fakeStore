from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product, Category
from app.schemas.product import ProductResponse

router = APIRouter(prefix="/products", tags=["products"])


def _to_response(product: Product) -> ProductResponse:
    return ProductResponse.from_orm_product(product)


# IMPORTANT: /categories must come before /{id} — FastAPI matches routes in
# registration order, so "categories" would otherwise be treated as an id.

@router.get("/categories", response_model=list[str])
def get_categories(db: Session = Depends(get_db)):
    rows = db.query(Category.name).order_by(Category.name).all()
    return [row.name for row in rows]


@router.get("/category/{category}", response_model=list[ProductResponse])
def get_products_by_category(category: str, db: Session = Depends(get_db)):
    products = db.query(Product).filter(Product.category == category).all()
    if not products:
        raise HTTPException(status_code=404, detail=f"No products found in category '{category}'")
    return [_to_response(p) for p in products]


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return _to_response(product)


@router.get("", response_model=list[ProductResponse])
def get_products(
    limit: int = Query(default=None, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(Product)
    if limit is not None:
        query = query.limit(limit)
    return [_to_response(p) for p in query.all()]
