import React, { useState, useEffect, useRef } from 'react';
import { PlatypusLogoSVG } from '../components/PlatypusPlaceholders';
import AnimatedPlatypus from '../components/AnimatedPlatypus';

const sampleProject: Record<string, { code: string; icon: string }> = {
  'package.json': {
    icon: '📄',
    code: `{
  "name": "todo-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`,
  },
  'src/App.tsx': {
    icon: '⚛️',
    code: `import React, { useState } from 'react';
import TodoList from './components/TodoList';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn about Platypus', completed: true },
    { id: 2, text: 'Implement a new feature', completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}

export default App;
`,
  },
  'src/components/TodoList.tsx': {
    icon: '⚛️',
    code: `import React from 'react';
import { Todo } from '../App';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
};

export default TodoList;`,
  },
  'src/components/TodoItem.tsx': {
    icon: '⚛️',
    code: `import React from 'react';
import { Todo } from '../App';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <li
      onClick={() => onToggle(todo.id)}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
    >
      {todo.text}
    </li>
  );
};

export default TodoItem;`,
  },
};

const updatedProject = {
  ...sampleProject,
  'src/App.tsx': {
    ...sampleProject['src/App.tsx'],
    code: `import React, { useState } from 'react';
import TodoList from './components/TodoList';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn about Platypus', completed: true, dueDate: '2024-07-20' },
    { id: 2, text: 'Implement a new feature', completed: false, dueDate: '2024-07-22' },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoList todos={todos} onToggle={toggleTodo} />
    </div>
  );
}

export default App;
`,
  },
  'src/components/TodoItem.tsx': {
    ...sampleProject['src/components/TodoItem.tsx'],
    code: `import React from 'react';
import { Todo } from '../App';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <li
      onClick={() => onToggle(todo.id)}
    >
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      {todo.dueDate && <small style={{ marginLeft: '8px', color: 'gray' }}> (Due: {todo.dueDate})</small>}
    </li>
  );
};

export default TodoItem;`,
  },
};

const diffView = `
Changes for: src/App.tsx
------------------------
- export interface Todo {
-   id: number;
-   text: string;
-   completed: boolean;
- }
+ export interface Todo {
+   id: number;
+   text: string;
+   completed: boolean;
+   dueDate?: string;
+ }
...
-     { id: 1, text: 'Learn about Platypus', completed: true },
-     { id: 2, text: 'Implement a new feature', completed: false },
+     { id: 1, text: 'Learn about Platypus', completed: true, dueDate: '2024-07-20' },
+     { id: 2, text: 'Implement a new feature', completed: false, dueDate: '2024-07-22' },

Changes for: src/components/TodoItem.tsx
------------------------------------
-     <li
-       onClick={() => onToggle(todo.id)}
-       style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
-     >
-       {todo.text}
-     </li>
+     <li
+       onClick={() => onToggle(todo.id)}
+     >
+       <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
+         {todo.text}
+       </span>
+       {todo.dueDate && <small style={{ marginLeft: '8px', color: 'gray' }}> (Due: {todo.dueDate})</small>}
+     </li>
`;


interface PlaygroundProps {
  onExit: () => void;
}

const Playground: React.FC<PlaygroundProps> = ({ onExit }) => {
  const [activeFile, setActiveFile] = useState('src/App.tsx');
  const [files, setFiles] = useState(sampleProject);
  const [messages, setMessages] = useState<any[]>([]);
  const [demoStep, setDemoStep] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMessages([
      { type: 'ai', text: "Welcome to the Platypus Playground! I've loaded a simple React To-Do app. Let's add a new feature together. Click the button below to get started." }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePrompt = () => {
    if (demoStep === 0) {
      const promptText = "Add a 'due date' feature to each to-do item.";
      setMessages(prev => [...prev, {type: 'user', text: promptText}]);
      setTimeout(() => {
         setMessages(prev => [...prev, {
            type: 'ai', 
            text: "Of course! To add a due date, I need to modify the `Todo` interface in `App.tsx` and update the `TodoItem.tsx` component to display it. Here are the proposed changes:",
            diff: diffView,
        }]);
      }, 1200);
      setDemoStep(1);
    }
  };

  const handleApply = () => {
    if (demoStep === 1) {
        setFiles(updatedProject);
        setActiveFile('src/components/TodoItem.tsx');
        setMessages(prev => [...prev, {
            type: 'ai',
            text: "Excellent! I've applied the changes. You can see the updated code in the editor. Platypus makes multi-file changes simple and safe. What's next?",
        }]);
        setDemoStep(2);
    }
  };
  
  const renderDiff = (diffText: string) => {
    return diffText.split('\n').map((line, index) => {
        let color = 'text-gray-300';
        if (line.startsWith('+')) color = 'text-green-400';
        if (line.startsWith('-')) color = 'text-red-400';
        if (line.startsWith('-') || line.startsWith('+')) {
            line = line.substring(1);
        }
        return <div key={index} className="whitespace-pre-wrap">{line}</div>
    })
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white font-sans flex flex-col animate-fade-in-subtle">
      <header className="flex-shrink-0 bg-gray-800 border-b border-gray-700 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <PlatypusLogoSVG className="w-8 h-8" />
            <span className="text-xl font-bold">Platypus Playground</span>
        </div>
        <button onClick={onExit} className="px-4 py-1 bg-platypus-accent text-white font-semibold rounded-md hover:bg-red-500 transition-colors">
            Exit Playground
        </button>
      </header>
      <div className="flex-grow flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-1/5 bg-gray-800/50 p-4 border-r border-gray-700 overflow-y-auto">
          <h2 className="text-sm font-bold uppercase text-gray-400 mb-4">Files</h2>
          {Object.entries(files).map(([path, data]) => (
            <div 
              key={path} 
              onClick={() => setActiveFile(path)}
              className={`flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm ${activeFile === path ? 'bg-platypus-primary/20 text-platypus-primary' : 'hover:bg-gray-700/50'}`}>
              <span>{(data as { icon: string }).icon}</span>
              <span>{path}</span>
            </div>
          ))}
        </div>

        {/* Code & Chat */}
        <div className="w-4/5 flex flex-col">
          {/* Code Editor */}
          <div className="flex-grow w-full bg-[#1e1e1e] p-4 overflow-y-auto">
            <pre className="text-sm">
                <code className="language-tsx whitespace-pre-wrap font-mono">
                    {files[activeFile]?.code}
                </code>
            </pre>
          </div>
          {/* Chat Panel */}
          <div className="flex-shrink-0 h-2/5 bg-gray-800 border-t border-gray-700 flex flex-col">
            <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 mb-4 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                        {msg.type === 'ai' && <AnimatedPlatypus mascotType="chat" className="w-10 h-10 flex-shrink-0" />}
                        <div className={`p-3 rounded-lg max-w-2xl ${msg.type === 'ai' ? 'bg-gray-700' : 'bg-platypus-primary'}`}>
                           <p>{msg.text}</p>
                           {msg.diff && (
                               <div className="mt-3 p-3 bg-black/50 rounded-md font-mono text-xs">
                                   {renderDiff(msg.diff)}
                               </div>
                           )}
                        </div>
                    </div>
                ))}
                 <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-gray-700">
                {demoStep === 0 && (
                    <button onClick={handlePrompt} className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        Add a 'due date' feature to each to-do item.
                    </button>
                )}
                {demoStep === 1 && (
                     <button onClick={handleApply} className="w-full text-center p-3 bg-green-600 hover:bg-green-500 rounded-lg transition-colors font-bold">
                        Apply Changes
                    </button>
                )}
                 {demoStep === 2 && (
                     <div className="text-center p-3 bg-gray-700 rounded-lg">
                        <p>Demo complete! <button onClick={onExit} className="text-platypus-primary underline">Exit the playground</button> to download the real extension.</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;