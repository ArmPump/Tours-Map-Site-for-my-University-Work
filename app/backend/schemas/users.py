from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str = Field(..., min_length=5, max_length=32,
                          description="Enter tour username")
    email: str = Field(..., min_length=5, max_length=128,
                       description="Enter your email address")
    profile_img: Optional[str] = Field(None, description="User profile image")

class UserCreate(UserBase):
    password: str = Field(..., min_length=5, max_length=32,
                          description="Enter your password")

class UserResponse(UserBase):
    id: int = Field(..., description="Unique user ID")
    created_at: datetime

    class Config:
        from_attributes = True