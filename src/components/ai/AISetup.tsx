import React, { useState } from 'react';
import { useAI } from './AIProvider';
import { Loader2, X } from 'lucide-react';

const AISetup = () => {
  const { isEnabled, apiKey, setApiKey, toggleAI } = useAI();
  const [showModal, setShowModal] = useState(!apiKey);
  const [key, setKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // In a real app, validate the API key here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setApiKey(key);
      toggleAI();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to validate API key:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Enable AI Features</h3>
          <button
            onClick={() => setShowModal(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <p className="text-gray-600 mb-4">
            Enter your OpenAI API key to enable AI-powered features like cover letter generation,
            interview preparation, and resume optimization.
          </p>

          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              OpenAI API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="sk-..."
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Skip
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !key}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Enable AI Features
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AISetup;