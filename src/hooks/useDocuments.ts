import { useState, useEffect } from 'react';
import { useSupabase } from './useSupabase';
import { useUser } from '../contexts/UserContext';

export const useDocuments = () => {
  const { userData } = useUser();
  const { getDocuments, saveDocument, deleteDocument } = useSupabase();
  const [documents, setDocuments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    if (!userData.id) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const docs = await getDocuments(userData.id);
      setDocuments(docs);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setError('Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData.id) {
      fetchDocuments();
    }
  }, [userData.id]);

  const addDocument = async (document: any) => {
    if (!userData.id) {
      throw new Error('User ID is required');
    }

    setIsLoading(true);
    setError(null);
    try {
      const newDoc = await saveDocument({
        ...document,
        user_id: userData.id,
        metadata: document.metadata || {}
      });
      setDocuments(prev => [newDoc, ...prev]);
      return newDoc;
    } catch (err) {
      console.error('Error saving document:', err);
      setError('Failed to save document');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeDocument = async (documentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteDocument(documentId);
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (err) {
      console.error('Error deleting document:', err);
      setError('Failed to delete document');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    documents,
    isLoading,
    error,
    addDocument,
    removeDocument,
    refreshDocuments: fetchDocuments
  };
};