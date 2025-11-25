import type { AiResponses, ExamplePrompt } from './types';

export const examplePrompts: ExamplePrompt[] = [
  { id: 'react-todo-app', text: 'Scaffold a simple React To-Do application.' },
  { id: 'express-api', text: 'Generate an Express.js API with a user route.' },
  { id: 'python-scraper', text: 'Create a Python web scraper using BeautifulSoup.' },
];

const reactAppJsRaw = `import React, { useState } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState(['Learn Platypus', 'Build an app', 'Ship to production']);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const removeTodo = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="app">
      <h1 className="title">Platypus To-Do List</h1>
      <form onSubmit={addTodo} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new to-do..."
          className="todo-input"
        />
        <button type="submit" className="add-btn">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>
            <button onClick={() => removeTodo(index)} className="remove-btn">
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;`;

const reactIndexCssRaw = `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f4f4f9;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.app {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid #ddd;
}

.title {
  text-align: center;
  color: #5DA9E9;
  margin-bottom: 20px;
}

.input-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
}
.todo-input:focus {
  border-color: #5DA9E9;
}

.add-btn {
  padding: 10px 20px;
  border: none;
  background-color: #5DA9E9;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.remove-btn {
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 20px;
  line-height: 1;
}
`;

const reactPackageJsonRaw = `{
  "name": "react-todo-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`;

const expressServerJsRaw = `const express = require('express');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Platypus API!');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`;

const expressUsersJsRaw = `const express = require('express');
const router = express.Router();

// Mock database
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found.');
  res.json(user);
});

module.exports = router;`;

const pythonScraperPyRaw = `import requests
from bs4 import BeautifulSoup

def scrape_platypus_title():
    """
    Scrapes the main title from a demo website.
    """
    try:
        URL = "http://info.cern.ch" # Using a simple, stable site for demo
        response = requests.get(URL, timeout=5)
        response.raise_for_status()  # Raise an exception for bad status codes

        soup = BeautifulSoup(response.content, "html.parser")
        
        # Find the first h1 tag
        title_tag = soup.find("h1")
        
        if title_tag:
            print(f"Successfully scraped title: {title_tag.text.strip()}")
        else:
            print("Could not find an H1 title on the page.")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    scrape_platypus_title()
`;

const pythonRequirementsRaw = `requests==2.28.1
beautifulsoup4==4.11.1`;

export const aiResponses: AiResponses = {
  'react-todo-app': {
    files: {
      'src': {
        type: 'folder',
        children: {
          'App.js': { type: 'file', rawContent: reactAppJsRaw },
          'index.css': { type: 'file', rawContent: reactIndexCssRaw },
        }
      },
      'package.json': { type: 'file', rawContent: reactPackageJsonRaw }
    },
    terminal: [
      'Analyzing request for "React To-Do application"...',
      '✓ Identified required components: App.js, index.css, package.json',
      '✓ Generating file structure...',
      'CREATE src/App.js',
      'CREATE src/index.css',
      'CREATE package.json',
      '✓ Project scaffolded successfully.',
    ]
  },
  'express-api': {
    files: {
      'routes': {
        type: 'folder',
        children: {
          'users.js': { type: 'file', rawContent: expressUsersJsRaw },
        }
      },
      'server.js': { type: 'file', rawContent: expressServerJsRaw }
    },
    terminal: [
      'Analyzing request for "Express.js API"...',
      '✓ Planning API structure with user routes.',
      '✓ Generating file structure...',
      'CREATE server.js',
      'CREATE routes/users.js',
      '✓ Project scaffolded successfully.',
    ]
  },
  'python-scraper': {
    files: {
        'scraper.py': { type: 'file', rawContent: pythonScraperPyRaw },
        'requirements.txt': { type: 'file', rawContent: pythonRequirementsRaw },
    },
    terminal: [
      'Analyzing request for "Python web scraper"...',
      '✓ Selecting BeautifulSoup as the parsing library.',
      '✓ Generating file structure...',
      'CREATE scraper.py',
      'CREATE requirements.txt',
      '✓ Project scaffolded successfully.',
    ]
  }
};
