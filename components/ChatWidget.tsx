import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { PlatypusChatHeadSVG } from './PlatypusPlaceholders';
import { CloseIcon, SendIcon } from './ide/Icons';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi there! I'm Platypus. Ask me anything about my features, pricing, or how I can help you code faster!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSend = useCallback(async (promptText: string) => {
    const trimmedPrompt = promptText.trim();
    if (!trimmedPrompt || isLoading) return;

    setInput('');
    setHasInteracted(true);
    setMessages(prev => [...prev, { role: 'user', text: trimmedPrompt }]);
    setIsLoading(true);

    try {
        if (!chatRef.current) {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are Platypus, a friendly, witty, and helpful AI coding assistant. Your goal is to engage users on your landing page. Answer questions about your features (full-project context, autonomous agents, diff-style review), pricing, and how you compare to other tools. Keep your answers concise, friendly, and a little playful. Your creator is a world-class team of engineers. Do not mention that you are a language model. You are Platypus.",
                },
            });
        }
    
        const stream = await chatRef.current.sendMessageStream({ message: trimmedPrompt });

        let modelResponse = '';
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of stream) {
            const responseChunk = chunk as GenerateContentResponse;
            const textChunk = responseChunk.text;
            if (textChunk) {
              modelResponse += textChunk;
              setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].text = modelResponse;
                  return newMessages;
              });
            }
        }
    } catch (error) {
        console.error("Gemini API call failed:", error);
        setMessages(prev => [...prev, { role: 'model', text: "Oops! I'm having a little trouble connecting right now. Please try again in a moment." }]);
    } finally {
        setIsLoading(false);
    }
  }, [isLoading]);

  const starterPrompts = ["What is Platypus?", "How is it different?", "Tell me a coding joke"];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-platypus-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-platypus-primary/50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 animate-fade-in-up'}`}
        aria-label="Open Platypus chat"
      >
        <PlatypusChatHeadSVG className="w-12 h-12" />
      </button>

      {/* Chat Window */}
      <div className={`absolute bottom-0 right-0 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-platypus-dark-background rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 bg-platypus-secondary dark:bg-platypus-dark-secondary rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <PlatypusChatHeadSVG className="w-8 h-8"/>
            <h3 className="font-bold text-lg text-platypus-text dark:text-platypus-dark-text">Platypus Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-platypus-subtle dark:text-platypus-dark-subtle hover:bg-black/10 dark:hover:bg-white/10" aria-label="Close chat">
            <CloseIcon className="w-5 h-5"/>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-platypus-background/50 dark:bg-platypus-dark-background/50">
            {messages.map((msg, index) => (
                <div key={index} className={`flex mb-4 animate-fade-in-subtle ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm break-words ${msg.role === 'user' ? 'bg-platypus-primary text-white rounded-br-lg' : 'bg-platypus-secondary dark:bg-platypus-dark-secondary text-platypus-text dark:text-platypus-dark-text rounded-bl-lg'}`}>
                        {msg.text || <span className="inline-block w-2 h-4 bg-gray-400 animate-code-blink align-middle" />}
                    </div>
                </div>
            ))}
            {isLoading && messages[messages.length - 1].role === 'user' && (
                <div className="flex justify-start mb-4 animate-fade-in-subtle">
                    <div className="max-w-[85%] rounded-2xl p-3 text-sm bg-platypus-secondary dark:bg-platypus-dark-secondary text-platypus-text dark:text-platypus-dark-text rounded-bl-lg">
                        <div className="flex items-center space-x-1.5">
                            <span className="w-2 h-2 bg-platypus-subtle rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-platypus-subtle rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-platypus-subtle rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        
        {/* Starter Prompts */}
        {!hasInteracted && (
          <div className="flex-shrink-0 p-3 border-t border-gray-200 dark:border-gray-700 bg-platypus-secondary/50 dark:bg-platypus-dark-secondary/50">
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map(prompt => (
                <button 
                  key={prompt} 
                  onClick={() => handleSend(prompt)} 
                  className="px-3 py-1.5 bg-white dark:bg-platypus-dark-secondary border border-gray-300 dark:border-gray-600 rounded-full text-xs text-platypus-text dark:text-platypus-dark-text hover:bg-platypus-primary/10 hover:border-platypus-primary transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-platypus-secondary dark:bg-platypus-dark-secondary rounded-b-2xl">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex items-center space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full px-4 py-2 bg-white dark:bg-platypus-dark-background border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-platypus-primary text-platypus-text dark:text-platypus-dark-text"
              disabled={isLoading}
              aria-label="Chat input"
            />
            <button 
              type="submit" 
              className="w-10 h-10 flex-shrink-0 bg-platypus-accent text-white rounded-full flex items-center justify-center disabled:bg-platypus-subtle disabled:cursor-not-allowed transform transition hover:scale-110"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon className="w-5 h-5"/>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;