import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello. Ask me anything about Alex's work."
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    const initialModelMessage: ChatMessage = {
        id: modelMessageId,
        role: 'model',
        text: '',
        isStreaming: true
    };
    
    setMessages(prev => [...prev, initialModelMessage]);

    try {
      const responseStream = await sendMessageStream(userMessage.text);
      let fullText = '';
      
      for await (const chunk of responseStream) {
         const c = chunk as GenerateContentResponse;
         if (c.text) {
             fullText += c.text;
             setMessages(prev => prev.map(msg => msg.id === modelMessageId ? { ...msg, text: fullText } : msg));
         }
      }
       setMessages(prev => prev.map(msg => msg.id === modelMessageId ? { ...msg, isStreaming: false } : msg));
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev.filter(msg => msg.id !== modelMessageId), { id: Date.now().toString(), role: 'model', text: "Connection error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-primary text-background rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300 z-40 group border border-border"
        >
          <MessageSquare size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-surface border border-border px-2 py-1 rounded text-xs text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask AI Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[340px] md:w-[380px] bg-background rounded-2xl shadow-xl border border-border z-50 overflow-hidden flex flex-col h-[500px] animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/50">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               <span className="text-sm font-medium">Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-secondary hover:text-primary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-accent text-white' : 'bg-primary text-background'}`}>
                    <User size={12} />
                 </div>
                 <div className={`max-w-[80%] text-sm p-3 rounded-2xl leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-surface border border-border text-primary rounded-tr-none' 
                    : 'bg-surface border border-border text-primary rounded-tl-none'
                 }`}>
                    {msg.text}
                 </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-background">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                disabled={isLoading}
                className="w-full bg-surface border border-border rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-secondary/50 text-primary"
              />
              <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-1.5 bg-primary text-background rounded-full hover:bg-accent hover:text-white disabled:opacity-50 transition-colors"
              >
                  <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;