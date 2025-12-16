from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..services.tour_service import TourService
from ..schemas.tours import TourResponse, TourCreate, TourListResponse

router = APIRouter(
    prefix="/api/tours",
    tags=["tours"]
)


@router.get("", response_model=TourListResponse, status_code=status.HTTP_200_OK)
def get_tours(db: Session = Depends(get_db)):
    tour = TourService(db)
    return tour.get_all_tours()

@router.get("/category_name/{category_name}", response_model=TourListResponse, status_code=status.HTTP_200_OK)
def get_tours_by_category_name(category_name: str, db: Session = Depends(get_db)):
    tour = TourService(db)
    return tour.get_tour_by_category_name(category_name)

@router.get("/category_durations/{category_durations}", response_model=TourListResponse, status_code=status.HTTP_200_OK)
def get_tours_by_category_durations(category_durations: int, db: Session = Depends(get_db)):
    tour = TourService(db)
    return tour.get_tour_by_category_durations(category_durations)

@router.get("/category_difficulty/{category_difficulty}", response_model=TourListResponse, status_code=status.HTTP_200_OK)
def get_tours_by_category_difficulty(category_difficulty: str, db: Session = Depends(get_db)):
    tour = TourService(db)
    return tour.get_tour_by_category_difficulty(category_difficulty)

@router.get("/{tour_id}", response_model=TourResponse, status_code=status.HTTP_200_OK)
def get_tour_by_id(tour_id: int, db: Session = Depends(get_db)):
    tour = TourService(db)
    return tour.get_tour_by_id(tour_id)