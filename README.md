# AI Task Manager

> Приложение для управления задачами. React + Node.js + PostgreSQL.

![React](https://img.shields.io/badge/React-18-2563eb) ![Node](https://img.shields.io/badge/Node-22-16a34a) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-2563eb) ![Python](https://img.shields.io/badge/Python-3.14-f7c948) ![Docker](https://img.shields.io/badge/Docker-✓-2496ed)

# AI Task Manager

> React + Node.js + PostgreSQL + Python  
> Управление задачами с автоматическим AI-анализом текста

---

## Возможности

- Регистрация и вход (JWT)
- Создание, просмотр, изменение статуса, удаление задач
- Автоматический AI-анализ — определение приоритета и категории по тексту
- Цветовая индикация статусов (серая / синяя / белая на синем)
- Экспорт задач в CSV через отдельный export-service
- Автоматическая категоризация (business, development, education, personal, other)

---

## Стек

| Компонент | Технология |
|-----------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| БД | PostgreSQL |
| AI-анализ | Python + Flask (ключевые слова) |
| Export Service | Python + Flask |
| Контейнеризация | Docker + Docker Compose |

---

## Запуск

### Быстрый старт (Docker)

```bash
docker compose up --build
```

Открой [http://localhost:5173](http://localhost:5173)

> Все 5 сервисов (PostgreSQL, Python AI, Export Service, Backend, Frontend) запускаются автоматически.
> Данные БД сохраняются в Docker volume `pgdata`.

---

### Ручной запуск

Требуется **3 терминала**: Python → Node.js → (опционально Frontend)

#### 1. База данных

```bash
psql -U postgres -c "CREATE DATABASE taskmanager;"
```

Таблицы создаются автоматически при запуске backend.

#### 2. Python AI-сервис (порт 5001)

```bash
cd python_service
pip install -r requirements.txt
python app.py
```

#### 3. Backend (порт 5000)

```bash
cd backend
cp .env.example .env       # отредактируйте DB_PASSWORD
npm install
node src/index.js
```

#### 4. Frontend (порт 5173)

```bash
cd frontend
npm install
npm run dev
```

#### 5. Export Service (порт 5002)

```bash
cd export_service
pip install -r requirements.txt
python app.py
```

#### 6. Экспорт в CSV

**Через Docker Compose:**
```bash
curl http://localhost:5002/export -OJ
```

**Старый скрипт (без Docker):**
```bash
pip install python-dotenv psycopg2-binary
python export_tasks.py
```

---

## API

### Auth

| Метод | Путь | Описание |
|-------|------|---------|
| `POST` | `/auth/register` | Регистрация |
| `POST` | `/auth/login` | Вход |

### Tasks

| Метод | Путь | Описание |
|-------|------|---------|
| `GET` | `/tasks` | Список задач |
| `POST` | `/tasks` | Создать задачу |
| `PUT` | `/tasks/:id` | Обновить статус / приоритет / категорию |
| `DELETE` | `/tasks/:id` | Удалить задачу |

### Python AI

| Метод | Путь | Описание |
|-------|------|---------|
| `POST` | `/analyze` | Анализ текста, возвращает `{ priority, category }` |
| `GET` | `/health` | Проверка сервиса |

### Export Service

| Метод | Путь | Описание |
|-------|------|---------|
| `GET` | `/export` | Скачать CSV со всеми задачами |
| `GET` | `/health` | Проверка сервиса |

---

## Поля задачи

```
status:    new | in_progress | done
priority:  high | medium | low
category:  business | development | education | personal | other
```

## Пример

```json
POST /tasks
{ "title": "Подготовить презентацию для клиента", "description": "Сделать до пятницы" }

Response:
{
  "id": 1,
  "title": "Подготовить презентацию для клиента",
  "description": "Сделать до пятницы",
  "status": "new",
  "priority": "high",
  "category": "business",
  "created_at": "2026-06-11T12:00:00.000Z"
}
```

---

## Структура

```
taskManager/
├── backend/
│   ├── src/
│   │   ├── routes/          # authRoutes.js, tasksRoutes.js
│   │   ├── middleware/      # auth.js (JWT проверка)
│   │   └── index.js         # точка входа
│   ├── .env
│   ├── package.json
│   └── Dockerfile
├── database/
│   └── db.js                # PostgreSQL + автосоздание таблиц
├── frontend/
│   ├── src/
│   │   ├── components/      # TaskForm, TaskList, TaskRow
│   │   ├── App.jsx
│   │   ├── LoginPage.jsx
│   │   └── api.js
│   ├── vite.config.js
│   ├── package.json
│   └── Dockerfile
├── python_service/
│   ├── app.py               # AI-анализ текста
│   ├── requirements.txt
│   └── Dockerfile
├── export_service/
│   ├── app.py               # Экспорт задач в CSV
│   ├── requirements.txt
│   └── Dockerfile
├── export_tasks.py
├── docker-compose.yml
├── .dockerignore
├── .gitignore
└── README.md
```

---

## Разработчик

[@GMR005](https://github.com/GMR005)

