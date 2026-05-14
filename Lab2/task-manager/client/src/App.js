// client/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Завантаження задач із сервера
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/api/tasks');
    const data = await res.json();
    setTasks(data);
  };

  const viewDetails = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`);
    const data = await res.json();
    setSelectedTask(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Введіть назву задачі!");

    if (editingId) {
      // Редагування
      await fetch(`http://localhost:5000/api/tasks/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
      setEditingId(null);
    } else {
      // Додавання нової
      await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });
    }
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
    if (selectedTask && selectedTask.id === id) setSelectedTask(null);
  };

  const editTask = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Система управління задачами</h1>
      
      {/* Форма додавання/редагування */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Назва задачі" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ marginRight: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Опис задачі" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ marginRight: '10px' }}
        />
        <button type="submit">{editingId ? 'Зберегти зміни' : 'Додати задачу'}</button>
        {editingId && <button type="button" onClick={() => setEditingId(null)}>Скасувати</button>}
      </form>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Список задач */}
        <div style={{ flex: 1 }}>
          <h2>Список задач</h2>
          <ul>
            {tasks.map(task => (
              <li key={task.id} style={{ marginBottom: '10px' }}>
                <strong>{task.title}</strong>
                <button onClick={() => viewDetails(task.id)} style={{ marginLeft: '10px' }}>Деталі</button>
                <button onClick={() => editTask(task)} style={{ marginLeft: '5px' }}>Редагувати</button>
                <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '5px', color: 'red' }}>Видалити</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Деталі задачі */}
        {selectedTask && (
          <div style={{ flex: 1, border: '1px solid black', padding: '10px' }}>
            <h2>Деталі задачі #{selectedTask.id}</h2>
            <p><strong>Назва:</strong> {selectedTask.title}</p>
            <p><strong>Опис:</strong> {selectedTask.description}</p>
            <p><strong>Статус:</strong> {selectedTask.completed ? 'Виконано' : 'Не виконано'}</p>
            <button onClick={() => setSelectedTask(null)}>Закрити</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;