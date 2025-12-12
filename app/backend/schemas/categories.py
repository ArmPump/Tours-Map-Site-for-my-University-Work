from pydantic import Field, BaseModel
from typing import Optional

class CategoryBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=32,
                      description="Category name")
    difficulty: str = Field(..., min_length=3, max_length=20,
                            description="Tour difficulty")
    duration_days: int = Field(..., gt=0,
                               description="Tour duration days (greater than 0)")

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int = Field(..., description="Unique category ID")


    class Config:
        from_attributes = True