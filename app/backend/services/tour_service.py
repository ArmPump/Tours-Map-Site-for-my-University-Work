from sqlalchemy.orm import Session
from typing import List
from ..repositories.category_repository import CategoryRepository
from ..repositories.tour_repository import TourRepository
from ..schemas.tours import TourCreate, TourResponse, TourListResponse
from fastapi import HTTPException, status

class TourService:
    def __init__(self, db: Session):
        self.tour_repository = TourRepository(db)
        self.category_repository = CategoryRepository(db)

    def get_all_tours(self) -> TourListResponse:
        tours = self.tour_repository.get_all()
        tours_response = [TourResponse.model_validate(tour) for tour in tours]
        return TourListResponse(tours=tours_response, total=len(tours_response))

    def get_tour_by_id(self, tour_id: int) -> TourResponse:
        tour = self.tour_repository.get_by_id(tour_id)
        if not tour:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Tour by ID {tour_id} not found"
            )
        return tour
