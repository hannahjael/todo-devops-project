const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage
let todos = [];
let nextId = 1;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Create todo
app.post('/api/todos', (req, res) => {
  const todo = {
    id: nextId++,
    text: req.body.text,
    completed: false,
    createdAt: new Date()
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// Update todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todo.completed = req.body.completed;
  if (req.body.text) todo.text = req.body.text;
  
  res.json(todo);
});

// Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});