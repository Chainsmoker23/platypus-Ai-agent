import React from 'react';
import type { AiResponses } from './types';

export const examplePrompts = [
  { id: 'react-todo-app', text: 'Scaffold a simple React To-Do application.' },
  { id: 'express-api', text: 'Generate an Express.js API with a user route.' },
  { id: 'python-scraper', text: 'Create a Python web scraper using BeautifulSoup.' },
];

const reactAppJs = (
  <>
    <span className="text-purple-400">import</span> React, {'{ useState }'} <span className="text-purple-400">from</span> <span className="text-green-400">'react'</span>;
    <br />
    <span className="text-purple-400">import</span> {'\'./index.css\''}
    <br /><br />
    <span className="text-purple-400">function</span> <span className="text-yellow-400">App</span>() {'{'}
    <br />
    {'  '}<span className="text-purple-400">const</span> [todos, setTodos] = <span className="text-yellow-400">useState</span>([<span className="text-green-400">'Learn Platypus'</span>, <span className="text-green-400">'Build an app'</span>]);
    <br />
    {'  '}<span className="text-purple-400">const</span> [input, setInput] = <span className="text-yellow-400">useState</span>(<span className="text-green-400">''</span>);
    <br /><br/>
    {'  '}<span className="text-purple-400">const</span> <span className="text-yellow-400">addTodo</span> = () => {'{'}
    <br/>
    {'    '}<span className="text-purple-400">if</span> (input) {'{'}
    <br/>
    {'      '}<span className="text-yellow-400">setTodos</span>([...todos, input]);
    <br/>
    {'      '}<span className="text-yellow-400">setInput</span>(<span className="text-green-400">''</span>);
    <br/>
    {'    '}{'}'}
    <br/>
    {'  '}{'};'}
    <br /><br/>
    {'  '}<span className="text-purple-400">return</span> (
    <br />
    {'    '}&lt;<span className="text-red-400">div</span> <span className="text-cyan-400">className</span>=<span className="text-green-400">"app"</span>&gt;
    <br />
    {'      '}&lt;<span className="text-red-400">h1</span>&gt;Platypus To-Do List&lt;/<span className="text-red-400">h1</span>&gt;
    <br />
    {'      '}{/* ... implementation ... */}
    <br />
    {'    '}&lt;/<span className="text-red-400">div</span>&gt;
    <br />
    {'  '});
    <br />
    {'}'}
    <br /><br />
    <span className="text-purple-400">export default</span> App;
  </>
);

const reactAppJsRaw = `import React, { useState } from 'react';
import './index.css'

function App() {
  const [todos, setTodos] = useState(['Learn Platypus', 'Build an app']);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <div className="app">
      <h1>Platypus To-Do List</h1>
      {/* ... implementation ... */}
    </div>
  );
}

export default App;`;

const reactIndexCss = (
  <>
    <span className="text-cyan-400">body</span> {'{'}
    <br/>
    {'  '}<span className="text-purple-400">background-color</span>: <span className="text-blue-400">#282c34</span>;
    <br/>
    {'  '}<span className="text-purple-400">color</span>: white;
    <br/>
    {'}'}
  </>
);
const reactIndexCssRaw = `body {
  background-color: #282c34;
  color: white;
}`;

const reactPackageJson = (
  <>
    {'{'}
    <br/>
    {'  '}<span className="text-cyan-400">"name"</span>: <span className="text-green-400">"react-todo-app"</span>,
    <br/>
    {'  '}<span className="text-cyan-400">"version"</span>: <span className="text-green-400">"0.1.0"</span>,
    <br/>
    {'  '}<span className="text-cyan-400">"private"</span>: <span className="text-blue-400">true</span>
    <br/>
    {'}'}
  </>
);
const reactPackageJsonRaw = `{
  "name": "react-todo-app",
  "version": "0.1.0",
  "private": true
}`;

const expressServerJs = (
  <>
    <span className="text-purple-400">const</span> express = <span className="text-yellow-400">require</span>(<span className="text-green-400">'express'</span>);
    <br />
    <span className="text-purple-400">const</span> userRoutes = <span className="text-yellow-400">require</span>(<span className="text-green-400">'./routes/users'</span>);
    <br /><br />
    <span className="text-purple-400">const</span> app = <span className="text-yellow-400">express</span>();
    <br />
    <span className="text-purple-400">const</span> PORT = <span className="text-red-400">3001</span>;
    <br /><br />
    app.<span className="text-yellow-400">use</span>(express.<span className="text-yellow-400">json</span>());
    <br />
    app.<span className="text-yellow-400">use</span>(<span className="text-green-400">'/api/users'</span>, userRoutes);
    <br /><br />
    app.<span className="text-yellow-400">listen</span>(PORT, () => {'{'}
    <br />
    {'  '}<span className="text-yellow-400">console</span>.<span className="text-yellow-400">log</span>(<span className="text-green-400">{`\`Server running on port \${PORT}\``}</span>);
    <br />
    {'}'});
  </>
);
const expressServerJsRaw = `const express = require('express');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

const expressUsersJs = (
  <>
    <span className="text-purple-400">const</span> express = <span className="text-yellow-400">require</span>(<span className="text-green-400">'express'</span>);
    <br />
    <span className="text-purple-400">const</span> router = express.<span className="text-yellow-400">Router</span>();
    <br /><br />
    router.<span className="text-yellow-400">get</span>(<span className="text-green-400">'/'</span>, (req, res) => {'{'}
    <br />
    {'  '}res.<span className="text-yellow-400">json</span>({'{'} <span className="text-cyan-400">message</span>: <span className="text-green-400">'Get all users'</span> {'}'});
    <br />
    {'}'});
    <br /><br />
    <span className="text-purple-400">module</span>.exports = router;
  </>
);
const expressUsersJsRaw = `const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

module.exports = router;`;

const pythonScraperPy = (
  <>
    <span className="text-purple-400">import</span> requests
    <br />
    <span className="text-purple-400">from</span> bs4 <span className="text-purple-400">import</span> BeautifulSoup
    <br /><br />
    URL = <span className="text-green-400">"https://platypus-ai.com"</span>
    <br />
    page = requests.<span className="text-yellow-400">get</span>(URL)
    <br /><br />
    soup = <span className="text-yellow-400">BeautifulSoup</span>(page.content, <span className="text-green-400">"html.parser"</span>)
    <br />
    title = soup.<span className="text-yellow-400">find</span>(<span className="text-green-400">"h1"</span>)
    <br /><br />
    <span className="text-yellow-400">print</span>(title.text)
  </>
);
const pythonScraperPyRaw = `import requests
from bs4 import BeautifulSoup

URL = "https://platypus-ai.com"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")
title = soup.find("h1")

print(title.text)`;

const pythonRequirements = (
  <>
    requests==<span className="text-red-400">2.28.1</span>
    <br />
    beautifulsoup4==<span className="text-red-400">4.11.1</span>
  </>
);
const pythonRequirementsRaw = `requests==2.28.1
beautifulsoup4==4.11.1`;

export const aiResponses: AiResponses = {
  'react-todo-app': {
    files: {
      'src': {
        type: 'folder',
        children: {
          'App.js': { type: 'file', content: reactAppJs, rawContent: reactAppJsRaw },
          'index.css': { type: 'file', content: reactIndexCss, rawContent: reactIndexCssRaw },
        }
      },
      'package.json': { type: 'file', content: reactPackageJson, rawContent: reactPackageJsonRaw }
    },
    terminal: [
      '$ platypus create react-todo-app',
      '✓ Project structure generated.',
      '✓ Installing dependencies with npm...',
      '✓ Dependencies installed.',
      '✓ Build successful.',
      '> To start, run: npm start'
    ],
    openTabs: ['src/App.js', 'src/index.css'],
    initialActiveTab: 'src/App.js'
  },
  'express-api': {
    files: {
      'routes': {
        type: 'folder',
        children: {
          'users.js': { type: 'file', content: expressUsersJs, rawContent: expressUsersJsRaw },
        }
      },
      'server.js': { type: 'file', content: expressServerJs, rawContent: expressServerJsRaw }
    },
    terminal: [
      '$ platypus generate express-api --with-routes',
      '✓ API structure generated.',
      '✓ server.js created.',
      '✓ routes/users.js created.',
      '✓ Run `npm install express` to install dependencies.',
    ],
    openTabs: ['server.js', 'routes/users.js'],
    initialActiveTab: 'server.js'
  },
  'python-scraper': {
    files: {
        'scraper.py': { type: 'file', content: pythonScraperPy, rawContent: pythonScraperPyRaw },
        'requirements.txt': { type: 'file', content: pythonRequirements, rawContent: pythonRequirementsRaw },
    },
    terminal: [
      '$ platypus create python-scraper --template beautifulsoup',
      '✓ Python script generated.',
      '✓ requirements.txt created.',
      '> To install dependencies, run: pip install -r requirements.txt',
    ],
    openTabs: ['scraper.py'],
    initialActiveTab: 'scraper.py'
  }
};
