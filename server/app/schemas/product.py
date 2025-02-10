from pydantic import BaseModel, model_validator


class RatingSchema(BaseModel):
    rate: float
    count: int


class ProductResponse(BaseModel):
    id: int
    title: str
    price: float
    description: str
    category: str
    image: str
    rating: RatingSchema

    model_config = {"from_attributes": True}

    @model_validator(mode="before")
    @classmethod
    def _build_rating(cls, data):
        # When constructed from an ORM object, synthesise the nested rating field
        # from the flat rating_rate / rating_count columns.
        if hasattr(data, "rating_rate"):
            return {
                "id": data.id,
                "title": data.title,
                "price": data.price,
                "description": data.description,
                "category": data.category,
                "image": data.image,
                "rating": {"rate": data.rating_rate, "count": data.rating_count},
            }
        return data

    @classmethod
    def from_orm_product(cls, product) -> "ProductResponse":
        return cls(
            id=product.id,
            title=product.title,
            price=product.price,
            description=product.description,
            category=product.category,
            image=product.image,
            rating=RatingSchema(rate=product.rating_rate, count=product.rating_count),
        )
