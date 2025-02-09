from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)

    products = relationship("Product", back_populates="category_rel")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    description = Column(String, nullable=False, default="")
    category = Column(String, ForeignKey("categories.name"), nullable=False, index=True)
    image = Column(String, nullable=False, default="")
    rating_rate = Column(Float, nullable=False, default=0.0)
    rating_count = Column(Integer, nullable=False, default=0)

    category_rel = relationship("Category", back_populates="products")
