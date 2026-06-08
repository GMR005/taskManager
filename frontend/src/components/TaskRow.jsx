export default function TaskRow({ task, onUpdate }) {
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
    onUpdate()
  }

  return (
    <tr>
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
      <td><button onClick={handleDelete}>Удалить</button></td>
    </tr>
  )
}
