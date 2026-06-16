import { useCallback, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import LoginPage from './LoginPage'
import {getToken, clearToken} from './api'
import './App.css'

export default function App() {
  const [token, setTokenState] = useState (getToken())
  const [refreshKey, setRefreshKey] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const handleLogin = () => {
    setTokenState(getToken())
  }

  const handleLogout = () => {
    clearToken()
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task Manager</h1>
        <button onClick={handleLogout} style={{ padding: '6px 16px' }}>
          Выйти
        </button>
      </div>

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
