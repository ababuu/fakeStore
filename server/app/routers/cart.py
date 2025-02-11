from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.cart import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart import (
    AddToCartRequest,
    CartItemResponse,
    CartResponse,
    UpdateCartItemRequest,
)

router = APIRouter(prefix="/cart", tags=["cart"])


def _cart_response(items: list[CartItem]) -> CartResponse:
    total = sum(i.product.price * i.quantity for i in items)
    return CartResponse(items=items, total=round(total, 2))


@router.get("", response_model=CartResponse)
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    items = (
        db.query(CartItem)
        .filter(CartItem.user_id == current_user.id)
        .all()
    )
    return _cart_response(items)


@router.post("/items", response_model=CartItemResponse, status_code=status.HTTP_201_CREATED)
def add_item(
    body: AddToCartRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = db.query(Product).filter(Product.id == body.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    item = (
        db.query(CartItem)
        .filter(CartItem.user_id == current_user.id, CartItem.product_id == body.product_id)
        .first()
    )
    if item:
        item.quantity += body.quantity
    else:
        item = CartItem(
            user_id=current_user.id,
            product_id=body.product_id,
            quantity=body.quantity,
        )
        db.add(item)

    db.commit()
    db.refresh(item)
    return item


@router.put("/items/{product_id}", response_model=CartItemResponse)
def update_item(
    product_id: int,
    body: UpdateCartItemRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = (
        db.query(CartItem)
        .filter(CartItem.user_id == current_user.id, CartItem.product_id == product_id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Item not in cart")

    item.quantity = body.quantity
    db.commit()
    db.refresh(item)
    return item


@router.delete("/items/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_item(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = (
        db.query(CartItem)
        .filter(CartItem.user_id == current_user.id, CartItem.product_id == product_id)
        .first()
    )
    if not item:
        raise HTTPException(status_code=404, detail="Item not in cart")

    db.delete(item)
    db.commit()


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def clear_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()


@router.post("/merge", response_model=CartResponse)
def merge_cart(
    body: list[AddToCartRequest],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Merge a guest cart (array of {product_id, quantity}) into the user's server cart."""
    for entry in body:
        product = db.query(Product).filter(Product.id == entry.product_id).first()
        if not product:
            continue
        item = (
            db.query(CartItem)
            .filter(CartItem.user_id == current_user.id, CartItem.product_id == entry.product_id)
            .first()
        )
        if item:
            item.quantity += entry.quantity
        else:
            db.add(CartItem(
                user_id=current_user.id,
                product_id=entry.product_id,
                quantity=entry.quantity,
            ))

    db.commit()

    items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    return _cart_response(items)

