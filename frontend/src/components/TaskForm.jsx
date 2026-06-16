import { useState } from "react";
import './TaskForm.css';
import { api } from "../api";

export default function TaskForm({ onTaskCreated, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return

    await api('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })

    setTitle('');
    setDescription('');
    onTaskCreated();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название задачи"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание (необязательно)"
      />
      <div className="form-actions">
        <button type="submit">Создать</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Отмена</button>
      </div>
    </form>
  )
}
