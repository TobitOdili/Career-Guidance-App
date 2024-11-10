import React, { useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, Maximize2, Minimize2, AlertCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { CAREER_PATHS } from '../../types';
import { useAIChat } from './hooks/useAIChat';
import { useAI } from './AIProvider';

export const AICompanion = () => {
  const { userData } = useUser();
  const { 
    isEnabled, 
    apiKey, 
    isOpen, 
    setIsOpen, 
    contextPrompt,
    messages: aiMessages,
    addMessage 
  } = useAI();
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    isTyping,
    error,
    sendMessage,
    clearError,
  } = useAIChat();

  useEffect(() => {
    if (contextPrompt && isOpen) {
      sendMessage(contextPrompt);
    }
  }, [contextPrompt, isOpen]);

  // Only access career info if userData exists
  const careerInfo = userData ? CAREER_PATHS[userData.careerPath].specializations[userData.specialization] : null;

  const suggestions = careerInfo ? [
    {
      text: `What skills should I focus on for ${careerInfo.title}?`,
      action: () => handleSend(`What skills should I focus on for ${careerInfo.title}?`)
    },
    {
      text: "Create a learning path for me",
      action: () => handleSend("Can you create a personalized learning path based on my profile?")
    },
    {
      text: "Review my progress",
      action: () => handleSend("Can you review my current progress and suggest next steps?")
    }
  ] : [
    {
      text: "How can I get started?",
      action: () => handleSend("What's the best way to begin my tech career journey?")
    },
    {
      text: "Tell me about career paths",
      action: () => handleSend("What career paths are available in tech?")
    },
    {
      text: "Skills assessment",
      action: () => handleSend("How can I assess my current skills?")
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages]);

  const handleSend = async (messageContent: string) => {
    if (!messageContent.trim()) return;
    setInput('');
    await sendMessage(messageContent);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  if (!isEnabled || !apiKey) {
    return null;
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'w-96' : 'w-auto'}`}>
      {/* Main Chat Window */}
      {isOpen && !isMinimized && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">AI Career Assistant</h3>
                <p className="text-xs text-blue-100">Powered by OpenAI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error.message}</p>
                <button
                  onClick={clearError}
                  className="ml-auto p-1 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            {aiMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <Bot className="w-5 h-5" />
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {aiMessages.length === 0 && (
            <div className="p-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-600 mb-3">Suggested questions:</h4>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={suggestion.action}
                    className="w-full text-left p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 border border-gray-200"
                rows={1}
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimized State */}
      {isOpen && isMinimized && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-blue-600" />
              <span className="font-medium">AI Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Bot className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AICompanion;