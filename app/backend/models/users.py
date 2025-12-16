from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, autoincrement=True, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String(64), index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow())
    avatar = Column(String)

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', username='{self.username}')>"