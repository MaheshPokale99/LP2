const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory data for to-dos
let todos = [
  { id: 1, task: 'Learn JavaScript', completed: false },
  { id: 2, task: 'Build a To-Do List', completed: false },
];

// Get all tasks
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new task
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: Date.now(), task, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

// Update a task's completion status or task text
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  let todo = todos.find(t => t.id === parseInt(id));
  if (todo) {
    todo.task = task || todo.task;
    todo.completed = completed !== undefined ? completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a task
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(t => t.id !== parseInt(id));
  res.json({ message: 'Todo deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
