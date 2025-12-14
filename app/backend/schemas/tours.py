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
    description: Optional[str] = Field(None, description="Tour description")
    country_info: Optional[str] = Field(None, description="Tour country description")
    legal_info: Optional[str] = Field(None, description="Information about legal things")
    visa_info: Optional[str] = Field(None, description="Information about visa")
    preparation: Optional[str] = Field(None, description="Information about needed preparation")

class TourCreate(TourBase):
    pass

class TourResponse(TourBase):
    id: int = Field(..., description="Unique tour ID")
    category_name: str = Field(..., description="Tour category name")
    duration_days: int = Field(..., description="Tour counted durations days")
    difficulty: str = Field(..., description="Tour difficulty")


    class Config:
        from_attributes = True

class TourListResponse(BaseModel):
    tours: list[TourResponse]
    total: int = Field(..., description='Total number of tours')