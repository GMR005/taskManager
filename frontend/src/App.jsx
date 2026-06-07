import TaskForm from "./components/TaskForm";
import './App.css'

export default function App() {
  const handleTaskCreated=() => {
    console.log('задача создана')
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
    </div>
  )
}
