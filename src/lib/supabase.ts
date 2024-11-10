import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itawdrcqygaqgbghqxpj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0YXdkcmNxeWdhcWdiZ2hxeHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMjAwODEsImV4cCI6MjA0Njc5NjA4MX0.wdMrAsVLZmhUTMzunDVVBskhSgJZMmoRFPQjN6Os4cg';

export const supabase = createClient(supabaseUrl, supabaseKey);