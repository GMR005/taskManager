import { useCallback, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import './App.css'

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTaskCreated = useCallback(() => {
    setRefreshKey(k => k + 1)
  }, [])

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      
      <TaskList key={refreshKey} />
    </div>
  )
}
