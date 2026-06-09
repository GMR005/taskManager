import { useState, useEffect } from "react"
import TaskRow from "./TaskRow"
import './TaskList.css'

export default function TaskList() {
  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const res = await fetch('/tasks')
    const data = await res.json()
    setTasks(data)
  }

  useEffect(() => { fetchTasks() }, [])

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Создана</th>
            <th className="th-x"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr><td colSpan={4}>Нет задач</td></tr>
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
