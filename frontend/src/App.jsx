import { useCallback, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import LoginPage from './LoginPage'
import {getToken, getEmail, clearAuth} from './api'
import './App.css'

export default function App() {
  const [token, setTokenState] = useState(getToken())
  const [refreshKey, setRefreshKey] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const email = getEmail()

  const handleLogin = () => {
    setTokenState(getToken())
  }

  const handleLogout = () => {
    clearAuth()
    setTokenState(null)
  }

  const handleTaskCreated = useCallback(() => {
    setRefreshKey(k => k + 1)
    setShowForm(false)
  }, [])

  if (!token) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-left">
          <h1 className="app-title">Task Manager</h1>
        </div>
        <div className="app-header-right">
          <span className="app-user-email">{email}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </header>

      <TaskList key={refreshKey} />
      {showForm ? (
        <TaskForm onTaskCreated={handleTaskCreated} onCancel={() => setShowForm(false)} />
      ) : (
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Добавить задачу
        </button>
      )}
    </div>
  )
}
