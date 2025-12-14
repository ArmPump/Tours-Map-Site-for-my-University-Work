from sqlalchemy.orm import Session
from typing import List
from ..repositories.category_repository import CategoryRepository
from ..schemas.categories import CategoryCreate, CategoryResponse
from fastapi import HTTPException, status

class CategoryService:
    def __init__(self, db: Session):
        self.repository = CategoryRepository(db)

    def get_all_categories(self) -> List[CategoryResponse]:
        categories = self.repository.get_all()
        return [CategoryResponse.model_validate(cat) for cat in categories]

    def get_category_by_name(self, category_name: str) -> CategoryResponse:
        category = self.repository.get_by_name(category_name)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with name {category_name} not found"
            )
        return CategoryResponse.model_validate(category)

    def get_category_by_duration(self, duration_days: int) -> CategoryResponse:
        category = self.repository.get_by_duration(duration_days)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with counted duration days {duration_days} not found"
            )
        return CategoryResponse.model_validate(category)

    def get_category_by_difficulty(self, difficulty: str) -> CategoryResponse:
        category = self.repository.get_by_difficulty(difficulty)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with difficulty {difficulty} not found"
            )
        return CategoryResponse.model_validate(category)

    def create_category(self, category_data: CategoryCreate) -> CategoryResponse:
        category = self.repository.create(category_data)
        return CategoryResponse.model_validate(category)