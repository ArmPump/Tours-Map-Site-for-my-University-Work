from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    email = Column(String(128), unique=True, nullable=False, index=True)
    username = Column(String(64), unique=True, nullable=False)
    hashed_password = Column(String(64), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


    def __repr__(self):
        return f"<User(id={self.id}, username={self.email_login})>"
