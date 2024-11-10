import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://itawdrcqygaqgbghqxpj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0YXdkcmNxeWdhcWdiZ2hxeHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMjAwODEsImV4cCI6MjA0Njc5NjA4MX0.wdMrAsVLZmhUTMzunDVVBskhSgJZMmoRFPQjN6Os4cg';

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function uploadDocument(userId: string, file: File, metadata: any) {
  try {
    // Upload file to Storage
    const { data: fileData, error: uploadError } = await supabaseAdmin.storage
      .from('documents')
      .upload(`${userId}/${file.name}`, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('documents')
      .getPublicUrl(fileData.path);

    // Insert document record
    const { data: document, error: insertError } = await supabaseAdmin
      .from('documents')
      .insert({
        user_id: userId,
        name: file.name,
        url: publicUrl,
        type: metadata.type,
        metadata
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return document;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
}

export async function getDocuments(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteDocument(userId: string, documentId: string) {
  const { error } = await supabaseAdmin
    .from('documents')
    .delete()
    .eq('id', documentId)
    .eq('user_id', userId);

  if (error) throw error;
}