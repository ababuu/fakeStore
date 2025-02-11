from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.utils.security import decode_access_token


def get_current_user(
    access_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Not authenticated",
    )
    if access_token is None:
        raise credentials_exception

    user_id = decode_access_token(access_token)
    if user_id is None:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id, User.is_active == True).first()
    if user is None:
        raise credentials_exception

    return user


def get_current_user_optional(
    access_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db),
) -> User | None:
    """Like get_current_user but returns None instead of raising for unauthenticated requests."""
    if access_token is None:
        return None
    user_id = decode_access_token(access_token)
    if user_id is None:
        return None
    return db.query(User).filter(User.id == user_id, User.is_active == True).first()
