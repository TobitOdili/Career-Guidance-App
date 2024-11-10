import { useState, useCallback } from 'react';
import { AIMessage, AIError, AIState } from '../types';
import { OpenAIService } from '../services/openai';
import { useAI } from '../AIProvider';

export const useAIChat = () => {
  const { apiKey, isEnabled } = useAI();
  const [state, setState] = useState<AIState>({
    messages: [],
    isTyping: false,
    error: null,
  });

  const addMessage = (message: AIMessage) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const setError = (error: AIError) => {
    setState(prev => ({
      ...prev,
      error,
      isTyping: false,
    }));
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!isEnabled || !apiKey) {
      setError({
        message: 'AI is not enabled or API key is missing',
        code: 'AI_NOT_ENABLED',
        timestamp: new Date(),
      });
      return;
    }

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setState(prev => ({ ...prev, isTyping: true, error: null }));

    try {
      const openai = new OpenAIService(apiKey);
      const response = await openai.generateResponse([...state.messages, userMessage]);

      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      addMessage(assistantMessage);
    } catch (error) {
      setError({
        message: error instanceof Error ? error.message : 'Failed to generate response',
        code: 'API_ERROR',
        timestamp: new Date(),
      });
    } finally {
      setState(prev => ({ ...prev, isTyping: false }));
    }
  }, [apiKey, isEnabled, state.messages]);

  const clearMessages = () => {
    setState(prev => ({ ...prev, messages: [], error: null }));
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    messages: state.messages,
    isTyping: state.isTyping,
    error: state.error,
    sendMessage,
    clearMessages,
    clearError,
  };
};