import { useState, useEffect } from "react"
import TaskRow from "./TaskRow"
import './TaskList.css'
import { api } from "../api"

export default function TaskList() {
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    try {
        const data = await api('/tasks')
        setTasks(data)
    } catch {
        setTasks([])
    }
  }

  useEffect(() => { fetchTasks() }, [])

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Приоритет</th>
            <th>Категория</th>
            <th>Создана</th>
            <th className="th-x"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr><td colSpan={6}>Нет задач</td></tr>
          ) : (
            tasks.map(task => (
              <TaskRow key={task.id} task={task} onUpdate={fetchTasks} />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
