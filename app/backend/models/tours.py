from sqlalchemy import Column, Integer, String, Text, ForeignKey
from ..database import Base
from sqlalchemy.orm import relationship

class Tour(Base):
    __tablename__ = "tours"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    destination = Column(String, nullable=False, index=True)
    country_code = Column(String, nullable=False, index=True)
    description = Column(Text)
    tour_details = Column(Text)
    price = Column(Integer, nullable=False)
    image_url = Column(String)
    country_info = Column(Text)
    legal_info = Column(Text)
    visa_info = Column(Text)
    preparation = Column(Text)
    duration_days = Column(Integer)
    difficulty = Column(String)
    category_id = Column(String, ForeignKey("categories.id"), nullable=False)

    categories = relationship("Category", back_populates="tours")

    def __repr__(self):
        return f"<Tour(id={self.id}, destination='{self.destination}', price={self.price})>"