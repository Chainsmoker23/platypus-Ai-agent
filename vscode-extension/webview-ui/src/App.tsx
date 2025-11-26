import React, { useState, useEffect, useRef, useCallback } from 'react';
import { vscode } from './vscode';

interface Message {
  author: 'user' | 'bot';
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    // Initial message from bot
    setMessages([{ author: 'bot', text: 'Hello! How can I help you with your code today?' }]);
    // Check for API key on load
    vscode.postMessage({ type: 'requestApiKey' });
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      switch (message.type) {
        case 'addMessage':
          setIsLoading(false);
          setMessages((prev) => [...prev, message.value]);
          break;
        case 'error':
          setIsLoading(false);
          setMessages((prev) => [...prev, { author: 'bot', text: `Error: ${message.value}` }]);
          break;
        case 'apiKey':
            setHasApiKey(message.value);
            break;
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSend = useCallback(() => {
    if (input.trim() && !isLoading) {
      const userMessage: Message = { author: 'user', text: input };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      const history = messages.map(msg => ({
        role: msg.author === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      vscode.postMessage({
        type: 'sendMessage',
        value: { message: input, history },
      });
      setInput('');
    }
  }, [input, isLoading, messages]);
  
  if (hasApiKey === null) {
      return <div className="loading-container">Checking configuration...</div>;
  }

  if (!hasApiKey) {
    return (
      <div className="api-key-container">
        <h3>API Key Required</h3>
        <p>Please set your Platypus API key to use the chat.</p>
        <button onClick={() => vscode.postMessage({ type: 'setApiKey' })}>
          Set API Key
        </button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.author}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
