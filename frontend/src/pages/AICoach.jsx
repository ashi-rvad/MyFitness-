import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AICoach = () => {
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hi there! I'm your FitMentor AI Coach. Ask me anything about workouts, diet, or fitness tips!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://myfitness-7d93.onrender.com';
      const response = await fetch(`${API_URL}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      setLoading(false);
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      let buffer = '';
      while (true) {
        const { value, done: readerDone } = await reader.read();
        if (readerDone) break;
        
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() || '';
        
        for (const part of parts) {
          const lines = part.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6).trim();
              if (dataStr === '[DONE]') break;
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.text) {
                  setMessages(prev => {
                    const newMsgs = [...prev];
                    const lastIndex = newMsgs.length - 1;
                    // Create a completely new object to avoid StrictMode double-mutation
                    newMsgs[lastIndex] = {
                      ...newMsgs[lastIndex],
                      content: newMsgs[lastIndex].content + parsed.text
                    };
                    return newMsgs;
                  });
                }
              } catch (e) {
                console.error("Parse error:", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">AI Fitness Coach</h1>
        <p className="text-gray-400 mt-2">Get personalized advice instantly from your AI mentor.</p>
      </header>

      <div className="flex-1 glass rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-2xl relative">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary-600 ml-3' : 'bg-slate-700 mr-3'}`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} className="text-primary-400" />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-slate-800 text-gray-200 border border-slate-700 rounded-tl-none'}`}>
                  {/* For a real app, use react-markdown here */}
                  <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row">
                <div className="w-8 h-8 rounded-full bg-slate-700 mr-3 flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-primary-400" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 rounded-tl-none flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-slate-900 border-t border-white/5">
          <form onSubmit={handleSend} className="flex space-x-4">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about exercises, diets, or fitness science..."
              className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-full px-6 py-3 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-primary-500/20 shrink-0"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AICoach;
