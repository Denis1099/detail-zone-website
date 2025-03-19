
// This file is now a simple re-export to maintain backward compatibility
// Import the Supabase client from the consolidated location
import { supabase } from '../../lib/supabase';

// Re-export the client
export { supabase };

// Add a warning for future deprecation to encourage migration to the new import path
console.warn(
  'Warning: Importing supabase from "@/integrations/supabase/client" is deprecated. ' +
  'Please update your imports to use "@/lib/supabase" instead.'
);
