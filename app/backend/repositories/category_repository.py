from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.categories import Category
from ..schemas.categories import CategoryCreate

class CategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Category]:
        return self.db.query(Category).all()

    def get_by_name(self, category_name: str) -> List[Category]:
        return self.db.query(Category).filter(Category.name == category_name).first()

    def get_by_difficulty(self, category_difficulty: str) -> Optional[Category]:
        return self.db.query(Category).filter(Category.difficulty == category_difficulty).first()

    def get_by_duration(self, category_duration: int) -> Optional[Category]:
        return self.db.query(Category).filter(Category.duration_days == category_duration).first()

    def create(self, category_data: CategoryCreate) -> Category:
        db_category = Category(**category_data.model_dumb())
        self.db.add(db_category)
        self.db.commit()
        self.db.refresh(db_category)
        return db_category

