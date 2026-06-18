# AI Task Manager

> Приложение для управления задачами. React + Node.js + PostgreSQL.

![React](https://img.shields.io/badge/React-18-2563eb) ![Node](https://img.shields.io/badge/Node-22-16a34a) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-2563eb) ![Python](https://img.shields.io/badge/Python-3.14-f7c948)

---

## Возможности

- Создание, просмотр, изменение статуса и удаление задач
- Автоматический анализ текста — определение приоритета и категории
- Регистрация и вход (JWT)
- Экспорт задач в CSV

---

## Стек технологий

| Компонент | Технология |
|-----------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| База данных | PostgreSQL |
| AI-анализ | Python + Flask (ключевые слова) |
| Экспорт | Python |

---

## Запуск проекта

### Требования
- Node.js v22+
- PostgreSQL 15+
- Python 3.14+

### 1. База данных
```bash
psql -U postgres -c "CREATE DATABASE taskmanager;"
2. Backend
cd backend
cp .env.example .env        # отредактируйте пароль
npm install
node src/index.js           # порт 5000
3. Python AI-сервис
cd backend/python_service
pip install -r requirements.txt
python app.py               # порт 5001
4. Frontend
cd frontend
npm install
npm run dev                 # порт 5173
5. Экспорт в CSV
pip install python-dotenv psycopg2-binary
python export_tasks.py
API
Авторизация
Метод
POST
POST
Задачи
Метод
GET
POST
PUT
DELETE
AI-анализ
Метод
POST
Пример ответа POST /tasks:
{
  "id": 1,
  "title": "Подготовить презентацию",
  "description": "Для клиента до пятницы",
  "status": "new",
  "priority": "high",
  "category": "business",
  "created_at": "2026-06-11T12:00:00.000Z"
}
Статусы: new, in_progress, done  
Приоритеты: high, medium, low  
Категории: business, development, education, personal, other
Структура проекта
taskManager/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── tasksRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── db.js
│   │   └── index.js
│   ├── python_service/
│   │   ├── app.py
│   │   └── requirements.txt
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskRow.jsx
│   │   ├── App.jsx
│   │   ├── LoginPage.jsx
│   │   └── api.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── export_tasks.py
├── .gitignore
└── README.md
Разработчик
- GitHub: @GMR005 (https://github.com/GMR005)

---

## Лицензия

MIT
