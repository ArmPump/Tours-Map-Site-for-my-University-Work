from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.users import User
from ..schemas.users import UserCreate

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[]: