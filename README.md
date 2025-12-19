# Zhukovsky Site

Веб-приложение на FastAPI с разделением на backend и frontend.

## Требования

- Python 3.8+
- PostgreSQL
- pip или poetry для управления зависимостями

## Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/ArmPump/zhukovsky-site.git
cd zhukovsky-site
```

### 2. Создание виртуального окружения

```bash
python -m venv venv
```

### 3. Активация виртуального окружения

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/MacOS:**
```bash
source venv/bin/activate
```

### 4. Установка зависимостей

```bash
pip install -r requirements.txt
```

## Настройка окружения

### 1. Конфигурация переменных окружения

Создайте или отредактируйте файл `.env` в директории `app/` с необходимыми переменными:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/zhukovsky_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 2. Настройка базы данных

Убедитесь, что PostgreSQL запущен и создана база данных:

```sql
CREATE DATABASE zhukovsky_db;
```

## Запуск backend

### Запуск сервера разработки

```bash
uvicorn app.backend.main:app --reload
```

**Параметры запуска:**
- `--reload` - автоматическая перезагрузка при изменении кода
- `--host 0.0.0.0` - доступ из внешней сети
- `--port 8000` - порт (по умолчанию 8000)

### Полная команда с параметрами

```bash
uvicorn app.backend.main:app --reload --host 0.0.0.0 --port 8000
```

После запуска API будет доступен по адресу:
- Основной URL: `http://localhost:8000`
- Документация Swagger: `http://localhost:8000/docs`
- Документация ReDoc: `http://localhost:8000/redoc`

## Структура проекта

```
zhukovsky-site/
├── app/
│   ├── backend/         # Backend код (FastAPI)
│   ├── frontend/        # Frontend код
│   ├── .env            # Переменные окружения
│   └── __init__.py
├── requirements.txt    # Python зависимости
├── .gitignore
└── README.md
```

## Основные зависимости

- **FastAPI** 0.122.0 - веб-фреймворк
- **SQLAlchemy** 2.0.44 - ORM для работы с БД
- **Uvicorn** 0.38.0 - ASGI сервер
- **Pydantic** 2.12.4 - валидация данных
- **python-jose** 3.5.0 - JWT токены
- **bcrypt** 5.0.0 - хеширование паролей
- **psycopg2-binary** 2.9.11 - драйвер PostgreSQL

## Разработка

### Миграции базы данных

Если используется Alembic для миграций:

```bash
alembic revision --autogenerate -m "описание изменений"
alembic upgrade head
```

### Тестирование

```bash
pytest
```

## Полезные команды

```bash
# Проверка зависимостей
pip list

# Обновление зависимостей
pip install --upgrade -r requirements.txt

# Остановка сервера
Ctrl + C

# Деактивация виртуального окружения
deactivate
```

## Troubleshooting

### Ошибка подключения к базе данных
- Проверьте, что PostgreSQL запущен
- Убедитесь, что данные в `.env` корректны
- Проверьте права доступа пользователя БД

### Ошибки импорта модулей
- Убедитесь, что виртуальное окружение активировано
- Переустановите зависимости: `pip install -r requirements.txt`

### Порт уже занят
- Измените порт: `uvicorn app.backend.main:app --port 8001`
- Или остановите процесс на порту 8000

## Лицензия

Добавьте информацию о лицензии проекта.

## Контакты

Добавьте контактную информацию или ссылки на документацию.