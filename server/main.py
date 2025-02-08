from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.routers import products, auth, cart, orders


app = FastAPI(title="FakeStore API", version="1.0.0")

# CORS — credentials require an explicit origin (no wildcard)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers under /api/v1
app.include_router(products.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(cart.router, prefix="/api/v1")
app.include_router(orders.router, prefix="/api/v1")


@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}


# Global error handler — consistent JSON shape for unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    import traceback
    import logging
    logging.getLogger("uvicorn.error").error(
        "Unhandled exception: %s", traceback.format_exc()
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred."},
    )
