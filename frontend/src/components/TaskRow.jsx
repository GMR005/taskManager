import { useState } from 'react'
import './TaskRow.css'
import { api } from '../api'

export default function TaskRow({ task, onUpdate }) {
  const handleStatusChange = async (e) => {
    await api(`/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: e.target.value })
    })
    onUpdate()
  }

  const handleDelete = async () => {
    await api(`/tasks/${task.id}`, { method: 'DELETE' })
    onUpdate()
  }

  return (
    <tr className="task-row">
      <td className="td-title">
        <div className="task-title">{task.title}</div>
        {task.description && <div className="task-desc">{task.description}</div>}
      </td>
      <td>
        <select className={`status-${task.status}`} value={task.status} onChange={handleStatusChange}>
          <option value="new">Новая</option>
          <option value="in_progress">Выполняется</option>
          <option value="done">Закончена</option>
        </select>
      </td>
      <td className="td-date">{new Date(task.created_at).toLocaleDateString()}</td>
      <td className="td-x">
        <button className="delete-btn" onClick={handleDelete}>✕</button>
      </td>
    </tr>
  )
}
