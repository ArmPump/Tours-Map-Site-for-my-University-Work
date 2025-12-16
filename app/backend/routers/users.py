from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.users import UserResponse, UserCreate
from ..services.user_service import UserService
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/users",
    tags=["users"]
)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    user = UserService(db)
    return user.create(user_data)

@router.get("/email/{email}", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = UserService(db)
    return user.get_by_email(email)

@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = UserService(db)
    return user.delete(user_id)

@router.get("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = UserService(db)
    return user.get_by_id(user_id)