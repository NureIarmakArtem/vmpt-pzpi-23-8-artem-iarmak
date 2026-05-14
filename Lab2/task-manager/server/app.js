const express = require("express"); 
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Вивчити Node.js", description: "Прочитати методичку", completed: false },
  { id: 2, title: "Зробити лабу", description: "Виконати завдання 1 та 2 рівня", completed: false }
];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});
 
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Задачу не знайдено");
  res.json(task);
});

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

app.put("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Задачу не знайдено");
  
  task.title = req.body.title !== undefined ? req.body.title : task.title;
  task.description = req.body.description !== undefined ? req.body.description : task.description;
  
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(5000, () => {
  console.log("Application started and Listening on port 5000"); 
});