// server/app.js
const express = require("express"); // підключення модуля express [cite: 63]
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // для аналізу JSON даних, надісланих із запитом [cite: 68]

// Імпровізована база даних у пам'яті
let tasks = [
  { id: 1, title: "Вивчити Node.js", description: "Прочитати методичку", completed: false },
  { id: 2, title: "Зробити лабу", description: "Виконати завдання 1 та 2 рівня", completed: false }
];

// 1. Отримання списку всіх задач (Рівень 1) 
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// 2. Отримання деталей конкретної задачі (Рівень 2) 
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Задачу не знайдено");
  res.json(task);
});

// 3. Додавання нової задачі (Рівень 2) 
app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title: req.body.title,
    description: req.body.description || "",
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 4. Редагування задачі (Рівень 2) 
app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Задачу не знайдено");
  
  task.title = req.body.title !== undefined ? req.body.title : task.title;
  task.description = req.body.description !== undefined ? req.body.description : task.description;
  
  res.json(task);
});

// 5. Видалення задачі (Рівень 2) 
app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Запуск сервера на порту 5000
app.listen(5000, () => {
  console.log("Application started and Listening on port 5000"); 
});