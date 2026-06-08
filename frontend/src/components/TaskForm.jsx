import { useState } from "react";
import './TaskForm.css';
export default function TaskForm({onTaskCreated}) {
    const[title, setTitle] = useState('');
    const [description, setDescriprion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return    

        await fetch('/tasks', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, description})
        })

        setTitle('');
        setDescriprion('');
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
                onChange={(e) => setDescriprion(e.target.value)}
                placeholder="Описание (необязательно"
            />
            <button type = "submit">Создать</button>
        </form>
    )
}
