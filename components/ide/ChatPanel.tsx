import React, { useState, useEffect, useRef } from 'react';
import { PlatypusChatHeadSVG } from '../PlatypusPlaceholders';
import { SendIcon } from './Icons';
import { aiResponses } from './aiResponses';

// Mock AI Responses & Logic
const getNewContentForClearTodos = () => {
  const newRawContent = `import React, { useState } from 'react';
import './index.css'

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

  const clearTodos = () => {
    setTodos([]);
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
      <button onClick={clearTodos} className="clear-btn">Clear All</button>
    </div>
  );
}

export default App;
`;

  // Create a simplified JSX version for display
  const newJsxContent = (
    <>
      <span className="text-gray-500">... (previous code) ...</span>
      <br />
      {'  '}<span className="text-purple-400">const</span> <span className="text-yellow-400">removeTodo</span> = (indexToRemove) => {'{ ... }'};
      <br />
      <br />
      <span className="text-green-400 bg-green-900/30">+   <span className="text-purple-400">const</span> <span className="text-yellow-400">clearTodos</span> = () => {'{'}</span>
      <br />
      <span className="text-green-400 bg-green-900/30">+     setTodos([]);</span>
      <br />
      <span className="text-green-400 bg-green-900/30">+   {'}'};</span>
      <br />
      <br />
      {'  '}<span className="text-purple-400">return</span> (
      <br />
      {'    '}&lt;<span className="text-red-400">div</span> <span className="text-cyan-400">className</span>=<span className="text-green-400">"app"</span>&gt;
      <br />
      <span className="text-gray-500">... (list rendering) ...</span>
      <br />
      {'      '}&lt;/<span className="text-red-400">ul</span>&gt;
      <br />
      <span className="text-green-400 bg-green-900/30">+       &lt;<span className="text-red-400">button</span> <span className="text-cyan-400">onClick</span>={'{clearTodos}'} <span className="text-cyan-400">className</span>=<span className="text-green-400">"clear-btn"</span>&gt;Clear All&lt;/<span className="text-red-400">button</span>&gt;
      </span>
      <br />
      {'    '}&lt;/<span className="text-red-400">div</span>&gt;
      <br />
      {'  '});
    </>
  );

  return { newRawContent, newJsxContent };
};


const getMockResponse = (prompt: string, activeTab: string | null, activeFileContent: string | null) => {
  const lowerCasePrompt = prompt.toLowerCase();

  if (!activeTab) {
    return { text: "I can help you with your code. Please open a file first so I have some context." };
  }

  if (lowerCasePrompt.includes('review')) {
    return { text: `Looking at \`${activeTab}\`...\n\nThe code structure seems solid. One suggestion would be to add some more descriptive comments for complex functions to improve maintainability.` };
  }
  
  if (lowerCasePrompt.includes('clear all') && activeTab.endsWith('App.js')) {
    const { newRawContent, newJsxContent } = getNewContentForClearTodos();
    return {
      text: "Sure! I can add a function to clear all to-do items and a button to trigger it. Here are the proposed changes:",
      codeChange: {
        filePath: activeTab,
        newRawContent,
        newJsxContent,
      }
    };
  }

  return { text: "I'm not sure how to help with that yet. You can try asking me to 'review this file' or, if you have the React To-Do app open, ask me to 'add a button to clear all todos'." };
};

// --- Component ---

interface ChatPanelProps {
  activeTab: string | null;
  activeFileContent: string | null;
  onApplyCodeChange: (filePath: string, newRawContent: string, newJsxContent: React.ReactNode) => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  codeChange?: {
    filePath: string;
    newRawContent: string;
    newJsxContent: React.ReactNode;
  };
}

const ChatPanel: React.FC<ChatPanelProps> = ({ activeTab, activeFileContent, onApplyCodeChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hello! I'm Platypus, your AI assistant. How can I help you with your code today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getMockResponse(input, activeTab, activeFileContent);
      setMessages(prev => [...prev, { sender: 'ai', ...aiResponse }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#252526]">
      <div className="p-2 border-b border-black/50">
        <h2 className="text-xs uppercase font-bold tracking-wider text-gray-400">Platypus Chat</h2>
      </div>
      <div className="flex-grow p-2 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && <PlatypusChatHeadSVG className="w-8 h-8 flex-shrink-0 mt-1" />}
            <div className={`text-xs max-w-xs md:max-w-sm rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-[#333333] text-gray-300'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.codeChange && (
                 <div className="mt-2 p-2 bg-black/30 rounded-md border border-gray-600">
                    <p className="text-gray-400 text-xs mb-1">Changes for `{msg.codeChange.filePath}`:</p>
                    <pre className="text-xs overflow-x-auto">
                        <code>
                            {msg.codeChange.newJsxContent}
                        </code>
                    </pre>
                    <button 
                        onClick={() => onApplyCodeChange(msg.codeChange!.filePath, msg.codeChange!.newRawContent, msg.codeChange!.newJsxContent)}
                        className="w-full mt-2 text-center p-1.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md text-xs transition-colors"
                    >
                        Apply Changes
                    </button>
                 </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <PlatypusChatHeadSVG className="w-8 h-8 flex-shrink-0 mt-1" />
            <div className="text-xs bg-[#333333] text-gray-300 rounded-lg p-3 inline-flex items-center">
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="p-2 border-t border-black/50">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Platypus a question..."
            className="flex-grow bg-[#3c3c3c] text-gray-200 rounded-md p-2 text-xs focus:outline-none focus:ring-1 focus:ring-platypus-primary"
            disabled={isTyping}
          />
          <button type="submit" disabled={isTyping || !input.trim()} className="bg-platypus-primary text-white rounded-md p-2 disabled:opacity-50 transition-opacity">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
