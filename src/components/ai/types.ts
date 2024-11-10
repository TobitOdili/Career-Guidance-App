export interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIError {
  message: string;
  code?: string;
  timestamp: Date;
}

export interface AIState {
  messages: AIMessage[];
  isTyping: boolean;
  error: AIError | null;
}

export interface AIConfig {
  apiKey?: string;
  isEnabled: boolean;
  systemPrompt: string;
}