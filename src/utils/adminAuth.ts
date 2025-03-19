
import { supabase, AdminUser } from '@/lib/supabase';

// Function to clear all auth state
export const clearAuthState = (
  setSession: (session: null) => void,
  setUser: (user: null) => void,
  setAdminUser: (adminUser: null) => void
) => {
  setSession(null);
  setUser(null);
  setAdminUser(null);
};

// Improved function to fetch admin user with retry logic
export const fetchAdminUser = async (userId: string, retryCount = 0): Promise<AdminUser | null> => {
  try {
    console.log("Fetching admin user for ID:", userId);
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching admin user:', error);
      
      // Retry logic for network errors (max 2 retries)
      if (retryCount < 2 && (error.code === 'NETWORK_ERROR' || error.code?.includes('timeout'))) {
        console.log(`Retrying admin user fetch (attempt ${retryCount + 1})...`);
        return await fetchAdminUser(userId, retryCount + 1);
      }
      
      return null;
    } 
    
    if (!data) {
      console.log("No admin user found for ID:", userId);
      return null;
    }
    
    console.log("Admin user data found:", data);
    return data as AdminUser;
  } catch (error) {
    console.error('Error in fetchAdminUser:', error);
    return null;
  }
};
