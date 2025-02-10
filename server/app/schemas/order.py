from datetime import datetime

from pydantic import BaseModel


class OrderItemResponse(BaseModel):
    id: int
    product_id: int | None
    title: str
    price: float
    image: str
    quantity: int

    model_config = {"from_attributes": True}


class OrderResponse(BaseModel):
    id: int
    status: str
    total: float
    created_at: datetime
    items: list[OrderItemResponse]

    model_config = {"from_attributes": True}
