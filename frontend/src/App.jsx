import { useCallback, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const handleTaskCreated = useCallback(() => {
    setRefreshKey(k => k + 1)
    setShowForm(false)
  }, [])

  return (
    <div className="app">
      <h1>Task Manager</h1>

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
