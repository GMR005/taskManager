# AI Task Manager

> React + Node.js + PostgreSQL + Python  
> Управление задачами с автоматическим AI-анализом текста

---

## Возможности

- Регистрация и вход (JWT)
- Создание, просмотр, изменение статуса, удаление задач
- Автоматический AI-анализ — определение приоритета и категории по тексту
- Цветовая индикация статусов (серая / синяя / белая на синем)
- Экспорт задач в CSV

---

## Стек

| Компонент | Технология |
|-----------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| БД | PostgreSQL |
| AI-анализ | Python + Flask (ключевые слова) |
| Экспорт | Python |

---

## Запуск

Требуется **3 терминала**: Python → Node.js → (опционально Frontend)

### 1. База данных

```bash
psql -U postgres -c "CREATE DATABASE taskmanager;"
```

Таблицы создаются автоматически при запуске backend.

### 2. Python AI-сервис (порт 5001)

```bash
cd backend/python_service
pip install -r requirements.txt
python app.py
```

### 3. Backend (порт 5000)

```bash
cd backend
cp .env.example .env       # отредактируйте DB_PASSWORD
npm install
node src/index.js
```

### 4. Frontend (порт 5173)

```bash
cd frontend
npm install
npm run dev
```

### 5. Экспорт в CSV

```bash
pip install python-dotenv psycopg2-binary
python export_tasks.py
# Создаст tasks_export_YYYYMMDD_HHMMSS.csv
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
│   │   ├── db.js            # PostgreSQL + автосоздание таблиц
│   │   └── index.js         # точка входа
│   ├── python_service/
│   │   ├── app.py           # AI-анализ текста
│   │   └── requirements.txt
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # TaskForm, TaskList, TaskRow
│   │   ├── App.jsx
│   │   ├── LoginPage.jsx
│   │   └── api.js
│   ├── vite.config.js
│   └── package.json
├── export_tasks.py
├── .gitignore
└── README.md
```

---

## Разработчик

[@GMR005](https://github.com/GMR005)
