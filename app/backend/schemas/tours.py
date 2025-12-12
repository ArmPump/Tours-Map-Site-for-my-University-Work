from pydantic import BaseModel, Field
from typing import Optional

class TourBase(BaseModel):
    name: str = Field(..., min_length=5, max_length=200,
                      description="Name of tour")
    country_code: str = Field(..., max_length=3,
                              description="Country code for tour")
    price: int = Field(..., gt=0,
                       description="Tour price greater than 0")
    image_url: Optional[str] = Field(None, description="Tour image")
    duration_days: int = Field(..., gt=0, description="Counted duration days (greater than 0)")
    difficulty: str = Field(..., description="Tour difficulty")
    category_name: str = Field(..., description="Tour category name")

class TourCreate(TourBase):
    pass

class TourResponse(TourBase):
    id: int = Field(..., description="Unique tour ID")

    class Config:
        from_attributes = True