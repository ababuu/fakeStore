from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.cart import CartItem
from app.models.order import Order, OrderItem
from app.models.user import User
from app.schemas.order import OrderResponse

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def place_order(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Convert the current user's cart into a new order and clear the cart."""
    items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not items:
        raise HTTPException(status_code=400, detail="Cart is empty")

    total = sum(i.product.price * i.quantity for i in items)

    order = Order(user_id=current_user.id, total=round(total, 2), status="confirmed")
    db.add(order)
    db.flush()  # get order.id before adding items

    for item in items:
        db.add(OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            title=item.product.title,
            price=item.product.price,
            image=item.product.image,
            quantity=item.quantity,
        ))

    # Clear cart
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    db.refresh(order)
    return order


@router.get("", response_model=list[OrderResponse])
def list_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id, Order.user_id == current_user.id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

