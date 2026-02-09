
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://grarfbaolajzlenewgod.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyYXJmYmFvbGFqemxlbmV3Z29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MzE5MjIsImV4cCI6MjA4NjIwNzkyMn0.SNvszRtuIYgkP7siMiLUZmtM8dBqgOKzdhC17bpZaUc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to handle Supabase errors gracefully.
 * If a table doesn't exist, we want to know but not crash the app.
 */
export const handleSupabaseError = (error: any, context: string) => {
  if (error) {
    console.warn(`Supabase ${context}:`, error.message);
    return true;
  }
  return false;
};
