from ..database import Base
from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)
    difficulty = Column(String, index=True)
    duration_days = Column(Integer, index=True)

    tours = relationship("Tour", back_populates="categories")

    def __repr__(self):
        return f"<Category(id={self.id}, name='{self.name}', difficulty='{self.difficulty}', duration_days='{self.duration_days}')>"
