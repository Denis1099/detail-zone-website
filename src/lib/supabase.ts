
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdtktpbxzwsomykkrhtn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdGt0cGJ4endzb215a2tyaHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NDc0MzEsImV4cCI6MjA1NjIyMzQzMX0.Punx6YFQgSLRfoZm53iVr8rywYyQXfRl3rS031qDcMI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AdminUser = {
  id: string;
  email: string;
  is_super_admin: boolean;
  created_at: string;
};
