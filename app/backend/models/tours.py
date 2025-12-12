from sqlalchemy import Column, Integer, String, Text, ForeignKey
from ..database import Base
from sqlalchemy.orm import relationship

class Tour(Base):
    __tablename__ = "tours"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String, nullable=False, index=True)
    country_code = Column(String, nullable=False, index=True)
    description = Column(Text)
    price = Column(Integer, nullable=False)
    image_url = Column(String)
    duration_days = Column(Integer, ForeignKey("categories.duration_days"))
    difficulty = Column(String, ForeignKey("categories.difficulty"))
    country_info = Column(Text)
    tour_details = Column(Text)
    legal_info = Column(Text)
    visa_info = Column(Text)
    preparation = Column(Text)
    category_name = Column(String, ForeignKey("categories.name"))

    categories = relationship("Category", back_populates="tours")

    def __repr__(self):
        return f"<Tour(id={self.id}, destination='{self.destination}', price={self.price})>"