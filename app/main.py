# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth_router

Base.metadata.drop_all(bind=engine)
print("Таблица удалена")

# === СОЗДАНИЕ ТАБЛИЦ В БД ===
# Это создаст все таблицы, которые описаны в models.py
# Выполняется один раз при запуске
Base.metadata.create_all(bind=engine)

# === СОЗДАНИЕ FASTAPI ПРИЛОЖЕНИЯ ===
app = FastAPI(
    title="Zhukovsky API",
    description="Backend API с авторизацией для интерактивной карты",
    version="1.0.0"
)

# === CORS (Cross-Origin Resource Sharing) ===
# Разрешаем фронтенду на другом порту обращаться к API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В production замени на конкретный домен!
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Разрешаем все заголовки
)

# === ПОДКЛЮЧЕНИЕ РОУТЕРОВ ===
app.include_router(auth_router.router)

# === КОРНЕВОЙ МАРШРУТ (для проверки что API работает) ===
@app.get("/")
def root():
    """
    Тестовый endpoint.
    Открой http://localhost:8000 - увидишь это сообщение.
    """
    return {
        "message": "Zhukovsky API работает!",
        "docs": "/docs",  # Swagger документация
        "version": "1.0.0"
    }

# === HEALTHCHECK (проверка что сервер жив) ===
@app.get("/health")
def health_check():
    """
    Используется для мониторинга.
    Например, Docker может проверять что контейнер жив.
    """
    return {"status": "healthy"}
