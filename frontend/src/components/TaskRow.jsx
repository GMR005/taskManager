import { useState } from 'react'
import './TaskRow.css'

export default function TaskRow({ task, onUpdate }) {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleStatusChange = async (e) => {
    await fetch(`/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: e.target.value })
    })
    onUpdate()
  }

  const handleDelete = async () => {
    await fetch(`/tasks/${task.id}`, { method: 'DELETE' })
    setShowConfirm(false)
    onUpdate()
  }

  return (
    <tr className="task-row">
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="new">new</option>
          <option value="in_progress">in_progress</option>
          <option value="done">done</option>
        </select>
      </td>
      <td>{new Date(task.created_at).toLocaleDateString()}</td>

      <td className="action-cell">
        {showConfirm ? (
          <div className="confirm-panel">
            <span>Удалить задачу?</span>
            <button className="confirm-yes" onClick={handleDelete}>Да</button>
            <button className="confirm-no" onClick={() => setShowConfirm(false)}>Нет</button>
          </div>
        ) : (
          <button className="delete-btn" onClick={() => setShowConfirm(true)}>✕</button>
        )}
      </td>
    </tr>
  )
}
