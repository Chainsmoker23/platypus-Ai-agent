import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import AnimatedPlatypus from './AnimatedPlatypus';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isApiConfigured, setIsApiConfigured] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.API_KEY) {
      setIsApiConfigured(true);
      setMessages([
        { type: 'ai', text: "Hello! I'm Platypus, your AI coding companion. How can I help you today?" }
      ]);
    } else {
      setIsApiConfigured(false);
      setMessages([
        { type: 'ai', text: "Welcome! To enable chat, please add your Gemini API key to your environment configuration." }
      ]);
    }
  }, []);
  
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApiConfigured || !input.trim() || isLoading) return;

    const userMessage = { type: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: currentInput,
        config: {
            systemInstruction: 'You are Platypus, a friendly and helpful AI coding assistant. Keep your responses concise, friendly, and helpful for a developer audience.',
        }
      });

      const aiMessage = { type: 'ai' as const, text: response.text ?? "I'm not sure how to respond to that." };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage = { type: 'ai' as const, text: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="w-16 h-16 bg-platypus-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-platypus-primary/90 focus:outline-none focus:ring-2 focus:ring-platypus-primary focus:ring-offset-2 transition-transform transform hover:scale-110"
          aria-label="Toggle chat widget"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
             </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm h-[60vh] bg-white rounded-2xl shadow-2xl flex flex-col animate-slide-in-up">
          <header className="bg-platypus-secondary p-4 rounded-t-2xl flex items-center gap-3 border-b border-gray-200">
            <AnimatedPlatypus mascotType="chat" className="w-12 h-12 flex-shrink-0" />
            <div>
                <h3 className="font-bold text-lg text-platypus-text">Chat with Platypus</h3>
                <p className="text-sm text-platypus-subtle">{isApiConfigured ? 'Online' : 'Offline'}</p>
            </div>
          </header>

          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 mb-4 ${msg.type === 'user' ? 'justify-end' : 'items-start'}`}>
                {msg.type === 'ai' && <AnimatedPlatypus mascotType="chat" className="w-8 h-8 flex-shrink-0 mt-1" />}
                <div className={`p-3 rounded-xl max-w-xs ${msg.type === 'ai' ? 'bg-platypus-secondary text-platypus-text' : 'bg-platypus-primary text-white'}`}>
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-3 mb-4 items-start">
                  <AnimatedPlatypus mascotType="chat" className="w-8 h-8 flex-shrink-0 mt-1" />
                  <div className="p-3 rounded-xl max-w-xs bg-platypus-secondary text-platypus-text">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-platypus-subtle rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-platypus-subtle rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-platypus-subtle rounded-full animate-bounce"></div>
                      </div>
                  </div>
               </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isApiConfigured ? "Ask me anything..." : "API Key not configured"}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-platypus-primary focus:outline-none disabled:bg-gray-100"
                disabled={isLoading || !isApiConfigured}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || !isApiConfigured}
                className="w-10 h-10 bg-platypus-primary text-white rounded-full flex-shrink-0 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-platypus-primary/90 transition-colors"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;