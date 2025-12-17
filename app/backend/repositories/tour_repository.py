from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from ..models.tours import Tour
from ..models.categories import Category
from ..schemas.tours import TourCreate

class TourRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Tour]:
        return self.db.query(Tour).options(joinedload(Tour.categories)).all()

    def get_by_id(self, tour_id: int) -> Optional[Tour]:
        return self.db.query(Tour).options(joinedload(Tour.categories)).filter(Tour.id == tour_id).first()

    def get_by_category_name(self, category_name: str) -> List[Tour]:
        return self.db.query(Tour).join(Category).filter(Category.name == category_name).all()

    def get_by_difficulty(self, difficulty_name: str) -> List[Tour]:
        return self.db.query(Tour).options(joinedload(Tour.categories)).filter(Tour.difficulty == difficulty_name).all()

    def get_by_duration(self, duration_days: int) -> List[Tour]:
        return self.db.query(Tour).options(joinedload(Tour.categories)).filter(Tour.duration_days == duration_days).all()

    def get_by_destination(self, destination: str) -> Optional[Tour]:
        return self.db.query(Tour).filter(Tour.destination == destination).first()

    def create(self, tour_data: TourCreate) -> Tour:
        db_tour = Tour(**tour_data.model_dump())
        self.db.add(db_tour)
        self.db.commit()
        self.db.refresh(db_tour)
        return db_tour

    def delete(self, tour_id: int) -> bool:
        tour = self.get_by_id(tour_id)
        if tour:
            self.db.delete(tour)
            self.db.commit()
            return True
        return False