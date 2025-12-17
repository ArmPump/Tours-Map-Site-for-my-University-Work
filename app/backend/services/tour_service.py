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
        return TourResponse.model_validate(tour)

    def get_tour_by_category_name(self, category_name: str) -> TourListResponse:
        category = self.category_repository.get_by_name(category_name)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with name {category_name} not found"
            )

        tours = self.tour_repository.get_by_category_name(category_name)
        tour_response = [TourResponse.model_validate(tour) for tour in tours]
        return TourListResponse(tours=tour_response, total=len(tour_response))

    def get_tour_by_category_durations(self, duration_days: int) -> TourListResponse:
        category = self.category_repository.get_by_duration(duration_days)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with duration days {duration_days} not found"
            )

        tours = self.tour_repository.get_by_duration(duration_days)
        tour_response = [TourResponse.model_validate(tour) for tour in tours]
        return TourListResponse(tours=tour_response, total=len(tour_response))

    def get_tour_by_category_difficulty(self, difficulty: str) -> TourListResponse:
        category = self.category_repository.get_by_difficulty(difficulty)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with difficulty {difficulty} not found"
            )

        tours = self.tour_repository.get_by_difficulty(difficulty)
        tour_response = [TourResponse.model_validate(tour) for tour in tours]
        return TourListResponse(tours=tour_response, total=len(tour_response))

    def create_tour(self, tour_data: TourCreate) -> TourResponse:
        existing_tour = self.tour_repository.get_by_destination(tour_data.destination)
        if existing_tour:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Tour with same destination {tour_data.destination} was found"
            )
        tour = self.tour_repository.create(tour_data)
        return TourResponse.model_validate(tour)

    def delete_tour(self, tour_id: id) -> dict:
        deleted = self.tour_repository.delete(tour_id)
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Tour with ID {tour_id} not found"
            )
        return {"message": f"Tour {tour_id} deleted successfully"}
