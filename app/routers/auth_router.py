# app/routers/auth_router.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from ..database import get_db
from ..models import User
from ..schemas import UserCreate, UserLogin, UserResponse, Token
from ..auth import (
    hash_password,
    verify_password,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

# Создаем роутер для авторизации
# prefix="/auth" - все маршруты будут начинаться с /auth
# tags - группировка в документации Swagger
router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# === ENDPOINT 1: РЕГИСТРАЦИЯ ===
@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Регистрация нового пользователя.

    Шаги:
    1. Проверяем что email и username уникальны
    2. Хэшируем пароль
    3. Создаем пользователя в БД
    4. Возвращаем данные пользователя (без пароля!)
    """

    # 1. ПРОВЕРКА: существует ли пользователь с таким email?
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email уже существует"
        )

    # 2. ПРОВЕРКА: существует ли пользователь с таким username?
    existing_username = db.query(User).filter(User.username == user_data.username).first()
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким username уже существует"
        )

    # 3. ХЭШИРУЕМ ПАРОЛЬ (никогда не храним в открытом виде!)
    hashed_pwd = hash_password(user_data.password)

    # 4. СОЗДАЕМ ОБЪЕКТ ПОЛЬЗОВАТЕЛЯ
    new_user = User(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_pwd,
        is_active=True  # По умолчанию активен
    )

    # 5. СОХРАНЯЕМ В БД
    db.add(new_user)  # Добавляем в сессию
    db.commit()  # Применяем изменения
    db.refresh(new_user)  # Обновляем объект (получаем id, created_at)

    # 6. ВОЗВРАЩАЕМ ДАННЫЕ (FastAPI автоматически преобразует в UserResponse)
    return new_user


# === ENDPOINT 2: ВХОД (LOGIN) ===
@router.post("/login", response_model=Token)
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    """
    Авторизация пользователя.

    Шаги:
    1. Находим пользователя по email или username
    2. Проверяем пароль
    3. Создаем JWT токен
    4. Возвращаем токен клиенту
    """

    # 1. ИЩЕМ ПОЛЬЗОВАТЕЛЯ по email ИЛИ username
    user = db.query(User).filter(
        (User.email == login_data.email_or_username) |
        (User.username == login_data.email_or_username)
    ).first()

    # Если не нашли
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email/username или пароль",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # 2. ПРОВЕРЯЕМ ПАРОЛЬ
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email/username или пароль",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # 3. ПРОВЕРЯЕМ ЧТО АККАУНТ АКТИВЕН
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Аккаунт заблокирован"
        )

    # 4. СОЗДАЕМ JWT ТОКЕН
    # Кладем в токен user_id и email
    access_token = create_access_token(
        data={"user_id": user.id, "email": user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    # 5. ВОЗВРАЩАЕМ ТОКЕН
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
