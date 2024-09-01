const apiUrl = 'http://localhost:3000';

async function login() {
    const username = document.getElementById('username').value;
    if (!username) return alert('Please enter a username.');

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    if (response.ok) {
        const { user } = await response.json();
        document.getElementById('user').textContent = user;
        document.getElementById('login').style.display = 'none';
        document.getElementById('todo').style.display = 'block';
        loadTodos();
    } else {
        alert('Login failed.');
    }
}

async function loadTodos() {
    const response = await fetch(`${apiUrl}/todos`);
    if (response.ok) {
        const todos = await response.json();
        const list = document.getElementById('todoList');
        list.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo;
            list.appendChild(li);
        });
    }
}

async function addTodo() {
    const item = document.getElementById('todoItem').value;
    if (!item) return alert('Please enter a to-do item.');

    const response = await fetch(`${apiUrl}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ item })
    });

    if (response.ok) {
        document.getElementById('todoItem').value = '';
        loadTodos();
    } else {
        alert('Failed to add to-do item.');
    }
}

async function logout() {
    await fetch(`${apiUrl}/logout`, { method: 'POST' });
    document.getElementById('login').style.display = 'block';
    document.getElementById('todo').style.display = 'none';
}

