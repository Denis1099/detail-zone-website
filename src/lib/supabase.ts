
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

const supabaseUrl = 'https://fdtktpbxzwsomykkrhtn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdGt0cGJ4endzb215a2tyaHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDc0MzEsImV4cCI6MjA1NjIyMzQzMX0.Punx6YFQgSLRfoZm53iVr8rywYyQXfRl3rS031qDcMI';

// Create a single Supabase client instance with proper configuration
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
  }
});

export type AdminUser = {
  id: string;
  email: string;
  is_super_admin: boolean;
  created_at: string;
};

// Add an explicit export to allow importing from the previously used path
// This helps with backward compatibility during the transition
export default supabase;
