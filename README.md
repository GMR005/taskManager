# AI Task Manager

> Приложение для управления задачами. React + Node.js + PostgreSQL.

![React](https://img.shields.io/badge/React-18-2563eb) ![Node](https://img.shields.io/badge/Node-22-16a34a) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-2563eb) ![Python](https://img.shields.io/badge/Python-3.14-f7c948)

---

## Содержание

- [Возможности](#возможности)
- [Стек технологий](#стек-технологий)
- [Установка и запуск](#установка-и-запуск)
- [API](#api)
- [Структура проекта](#структура-проекта)
- [Цветовое оформление](#цветовое-оформление)
- [Разработчик](#разработчик)

---

## Возможности

- **Создание задач** — форма с названием и описанием
- **Просмотр списка** — таблица со всеми задачами
- **Изменение статуса** — выпадающий список (Новая / Выполняется / Закончена)
- **Удаление задач** — по клику на ✕
- **Цветовая индикация** — статусы выделены разными цветами
- **Экспорт в CSV** — Python-скрипт выгрузки из БД

---

## Стек технологий

| Компонент | Технология |
|-----------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| База данных | PostgreSQL |
| Экспорт | Python 3.14 |

---

## Установка и запуск

### Требования

- **Node.js** v22+
- **PostgreSQL** 15+
- **Python** 3.14+

### 1. Клонирование

```bash
git clone <https://github.com/GMR005/taskManager>
cd taskManager
```

### 2. База данных

Создайте базу данных:

```bash
psql -U postgres -c "CREATE DATABASE taskmanager;"
```

> [!NOTE]
> Таблица `tasks` создаётся автоматически при первом запуске backend.

### 3. Backend

```bash
cd backend
npm install
```

Создайте файл `.env` на основе примера:
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=postgres
  DB_PASSWORD=your_password
  DB_NAME=taskmanager
  PORT=5000

```bash
cp .env.example .env
```

Отредактируйте пароль в `.env`, затем запустите сервер:

```bash
node src/index.js
```

Backend будет доступен на `http://localhost:5000`.

> [!TIP]
> Сервер создаёт таблицу `tasks` в базе данных автоматически. Проверить можно по адресу `http://localhost:5000/tasks` — должен вернуться пустой массив `[]`.

### 4. Frontend

Откройте новый терминал:

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на `http://localhost:5173`.

### 5. Python-скрипт экспорта

Установите зависимости:

```bash
pip install python-dotenv psycopg2-binary
```

Запустите скрипт (из корня проекта):

```bash
python export_tasks.py
```

Скрипт создаст CSV-файл с именем `tasks_export_YYYYMMDD_HHMMSS.csv`.

> [!IMPORTANT]
> Backend должен быть запущен, чтобы фронтенд мог отправлять запросы.

---

## API

| Метод | Путь | Описание |
|-------|------|---------|
| `POST` | `/tasks` | Создать задачу |
| `GET` | `/tasks` | Получить список задач |
| `PUT` | `/tasks/:id` | Изменить статус задачи |
| `DELETE` | `/tasks/:id` | Удалить задачу |

### Создание задачи

```http
POST /tasks
Content-Type: application/json

{
  "title": "Изучить React",
  "description": "Пройти базовый курс"
}
```

**Ответ:**

```json
{
  "id": 1,
  "title": "Изучить React",
  "description": "Пройти базовый курс",
  "status": "new",
  "created_at": "2026-06-11T12:00:00.000Z"
}
```

### Получение списка

```http
GET /tasks
```

**Ответ:**

```json
[
  {
    "id": 1,
    "title": "Изучить React",
    "description": "Пройти базовый курс",
    "status": "new",
    "created_at": "2026-06-11T12:00:00.000Z"
  }
]
```

### Изменение статуса

```http
PUT /tasks/1
Content-Type: application/json

{
  "status": "done"
}
```

Допустимые статусы: `new`, `in_progress`, `done`.

### Удаление задачи

```http
DELETE /tasks/1
```

---

## Структура проекта

```
taskManager/
│
├── backend/                   # Node.js + Express
│   ├── src/
│   │   ├── routes/
│   │   │   └── tasks.js       # CRUD-роуты
│   │   ├── db.js              # Подключение к PostgreSQL + автосоздание таблицы
│   │   └── index.js           # Точка входа сервера
│   ├── .env                   # Переменные окружения (в .gitignore)
│   ├── .env.example           # Пример настроек
│   └── package.json
│
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx   # Форма создания задачи
│   │   │   ├── TaskList.jsx   # Таблица задач
│   │   │   └── TaskRow.jsx    # Строка таблицы
│   │   ├── App.jsx            # Главный компонент
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── export_tasks.py            # Python-скрипт экспорта в CSV
├── .gitignore
└── README.md
```

---

## Цветовое оформление

| Статус | Вид | Цвет |
|--------|-----|------|
| **Новая** | Серый текст, белый фон | `#6b7280` |
| **Выполняется** | Синий текст, голубой фон | `#2563eb` |
| **Закончена** | Белый текст, синий фон | `#ffffff` на `#2563eb` |

Общий фон страницы — светло-голубой `#f0f4ff`, карточка приложения — белая с тенью.

---

## Разработчик

- GitHub: [@GMR005](https://github.com/GMR005)
- Проект создан в рамках практического задания "AI Task Manager"

---

## Лицензия

MIT
