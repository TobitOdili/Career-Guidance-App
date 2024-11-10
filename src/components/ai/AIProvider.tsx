import React, { createContext, useContext, useState } from 'react';
import { OpenAIService } from './services/openai';
import { AIMessage, AIError } from './types';
import { useUser } from '../../contexts/UserContext';

interface AIContextType {
  isEnabled: boolean;
  apiKey: string | null;
  setApiKey: (key: string) => void;
  toggleAI: () => void;
  generateCoverLetter: (params: {
    jobTitle: string;
    company: string;
    description: string;
    requirements: string[];
    userSkills: string[];
    additionalSkills?: string[];
    missingSkills?: string[];
  }) => Promise<string>;
  generateAIResponse: (prompt: string) => Promise<string>;
  generateInterviewQuestions: (job: any) => Promise<string>;
  updateResume: (job: any) => Promise<string>;
  isLoading: boolean;
  error: AIError | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contextPrompt: string | null;
  setContextPrompt: (prompt: string | null) => void;
  messages: AIMessage[];
  addMessage: (message: AIMessage) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: React.ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const { userData } = useUser();
  const [isEnabled, setIsEnabled] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AIError | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [contextPrompt, setContextPrompt] = useState<string | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);

  const toggleAI = () => {
    setIsEnabled(!isEnabled);
  };

  const addMessage = (message: AIMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const generateAIResponse = async (prompt: string): Promise<string> => {
    if (!apiKey) {
      throw new Error('API key not set');
    }

    setIsLoading(true);
    setError(null);

    try {
      const openai = new OpenAIService(apiKey);
      const userMessage: AIMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: prompt,
        timestamp: new Date()
      };
      addMessage(userMessage);

      const response = await openai.generateResponse([...messages, userMessage]);

      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      addMessage(assistantMessage);

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate response';
      setError({
        message: errorMessage,
        code: 'GENERATION_ERROR',
        timestamp: new Date()
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateCoverLetter = async (params: {
    jobTitle: string;
    company: string;
    description: string;
    requirements: string[];
    userSkills: string[];
    additionalSkills?: string[];
    missingSkills?: string[];
  }): Promise<string> => {
    if (!apiKey) {
      throw new Error('API key not set');
    }

    setIsLoading(true);
    setError(null);

    try {
      const openai = new OpenAIService(apiKey);
      const prompt = openai.formatCoverLetterPrompt({
        userName: userData.name,
        userEmail: userData.email,
        ...params,
        currentSkills: [...userData.skills, ...params.additionalSkills || []],
        userInsights: {
          recentCertifications: ['Git Essentials', 'Advanced JavaScript'],
          recentProjects: ['Node.js World Clock', 'React Weather Dashboard'],
          relevantExperience: ['Team Lead at University Hackathon', 'Open Source Contributor']
        }
      });

      const userMessage: AIMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: prompt,
        timestamp: new Date()
      };
      addMessage(userMessage);
      setIsOpen(true);

      const response = await openai.generateResponse([...messages, userMessage]);

      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      addMessage(assistantMessage);

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate response';
      setError({
        message: errorMessage,
        code: 'GENERATION_ERROR',
        timestamp: new Date()
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const generateInterviewQuestions = async (job: any): Promise<string> => {
    setContextPrompt(`Generate interview questions for ${job.title} position at ${job.company}`);
    setIsOpen(true);
    return '';
  };

  const updateResume = async (job: any): Promise<string> => {
    setContextPrompt(`Suggest resume updates for ${job.title} position at ${job.company}`);
    setIsOpen(true);
    return '';
  };

  return (
    <AIContext.Provider
      value={{
        isEnabled,
        apiKey,
        setApiKey,
        toggleAI,
        generateCoverLetter,
        generateAIResponse,
        generateInterviewQuestions,
        updateResume,
        isLoading,
        error,
        isOpen,
        setIsOpen,
        contextPrompt,
        setContextPrompt,
        messages,
        addMessage
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export default AIProvider;