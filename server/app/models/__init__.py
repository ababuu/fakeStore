# Models are imported here so Alembic's env.py can discover all tables
# via `import app.models` — add each model module as it is created.
from app.models.product import Category, Product  # noqa: F401
from app.models.user import User  # noqa: F401
from app.models.cart import CartItem  # noqa: F401
from app.models.order import Order, OrderItem  # noqa: F401
