const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api';

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const status = document.getElementById('status');
const totalTodos = document.getElementById('totalTodos');
const completedTodos = document.getElementById('completedTodos');

let todos = [];

// Show status message
function showStatus(message, isError = false) {
    status.textContent = message;
    status.className = `status ${isError ? 'error' : 'success'}`;
    setTimeout(() => {
        status.style.display = 'none';
    }, 3000);
}

// Update statistics
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    totalTodos.textContent = `Total: ${total}`;
    completedTodos.textContent = `Completed: ${completed}`;
}

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
        todoList.innerHTML = '<li style="text-align: center; color: #888; padding: 20px;">No todos yet. Add one above!</li>';
        return;
    }
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn" data-id="${todo.id}">Delete</button>
        `;
        todoList.appendChild(li);
    });
    
    updateStats();
}

// Fetch todos
async function fetchTodos() {
    try {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) throw new Error('Failed to fetch todos');
        todos = await response.json();
        renderTodos();
    } catch (error) {
        showStatus('Error loading todos', true);
        console.error(error);
    }
}

// Add todo
async function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;
    
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        if (!response.ok) throw new Error('Failed to add todo');
        
        const newTodo = await response.json();
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
        showStatus('Todo added successfully!');
    } catch (error) {
        showStatus('Error adding todo', true);
        console.error(error);
    }
}

// Toggle todo
async function toggleTodo(id) {
    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) return;
    
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !todo.completed })
        });
        
        if (!response.ok) throw new Error('Failed to update todo');
        
        todo.completed = !todo.completed;
        renderTodos();
    } catch (error) {
        showStatus('Error updating todo', true);
        console.error(error);
    }
}

// Delete todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Failed to delete todo');
        
        todos = todos.filter(t => t.id !== parseInt(id));
        renderTodos();
        showStatus('Todo deleted!');
    } catch (error) {
        showStatus('Error deleting todo', true);
        console.error(error);
    }
}

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

todoList.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') {
        toggleTodo(e.target.dataset.id);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTodo(e.target.dataset.id);
    }
});

// Initial load
fetchTodos();