from sqlalchemy.orm import Session
from typing import List
from ..repositories.user_repository import UserRepository
from ..schemas.users import UserCreate, UserResponse
from fastapi import HTTPException, status

class UserService:
    def __init__(self, db: Session):
        self.user_repository = UserRepository(db)

    def get_by_id(self, user_id: int) -> UserResponse:
        user = self.user_repository.get_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with ID {user_id} not found"
            )
        return UserResponse.model_validate(user)

    def get_by_email(self, email: str) -> UserResponse:
        user = self.user_repository.get_by_email(email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with email {email} not found"
            )
        return UserResponse.model_validate(user)

    def get_by_username(self, username: str) -> UserResponse:
        user = self.user_repository.get_by_username(username)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with username {username} not found"
            )
        return UserResponse.model_validate(user)

    def create(self, user_data: UserCreate) -> UserResponse:
        existing_email = self.user_repository.get_by_email(user_data.email)
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with email {user_data.email} already exist"
            )
        existing_username = self.user_repository.get_by_username(user_data.username)
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"User with username {user_data.username} already exist"
            )

        user = self.user_repository.create_user(user_data)
        return UserResponse.model_validate(user)

    def delete(self, user_id: int) -> dict:
        deleted = self.user_repository.delete_user(user_id)
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID {user_id} not found"
            )
        return {"message": f"User {user_id} deleted successfully"}
