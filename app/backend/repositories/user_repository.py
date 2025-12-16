from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from ..models.users import User
from ..schemas.users import UserCreate, UserResponse

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[User]:
        return self.db.query().all()

    def get_by_id(self, id: int) -> Optional[User]:
        return self.db.query().filter(User.id == id).first()

    def get_by_username(self, username: str) -> Optional[User]:
        return self.db.query().filter(User.username == username).first()

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query().filter(User.email == email).first()

    def create_user(self, user_data: UserCreate) -> User:
        db_user = User(**user_data.model_dump())
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user