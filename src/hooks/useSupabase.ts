import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itawdrcqygaqgbghqxpj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0YXdkcmNxeWdhcWdiZ2hxeHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMjAwODEsImV4cCI6MjA0Njc5NjA4MX0.wdMrAsVLZmhUTMzunDVVBskhSgJZMmoRFPQjN6Os4cg';

const supabase = createClient(supabaseUrl, supabaseKey);

export const useSupabase = () => {
  const saveUser = async (email: string, name: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ email, name }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

  const getUserByEmail = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  };

  const getDocuments = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  };

  const saveDocument = async (document: any) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([document])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving document:', error);
      throw error;
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };

  return {
    supabase,
    saveUser,
    getUserByEmail,
    getDocuments,
    saveDocument,
    deleteDocument
  };
};