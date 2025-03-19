import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, AdminUser } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AdminAuthContextType = {
  session: Session | null;
  user: User | null;
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Function to clear all auth state
  const clearAuthState = () => {
    setSession(null);
    setUser(null);
    setAdminUser(null);
  };

  // Improved function to fetch admin user with retry logic
  const fetchAdminUser = async (userId: string, retryCount = 0): Promise<AdminUser | null> => {
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

  // Handle session changes systematically
  const handleSessionChange = async (newSession: Session | null) => {
    console.log("Handling session change, session exists:", !!newSession);
    
    setSession(newSession);
    setUser(newSession?.user ?? null);
    
    if (newSession?.user) {
      try {
        // Fetch admin user data
        const adminData = await fetchAdminUser(newSession.user.id);
        setAdminUser(adminData);
        
        if (!adminData) {
          console.warn("User authenticated but no admin record found - logging out");
          // Only sign out if this wasn't triggered by a sign-out operation
          if (newSession) {
            await supabase.auth.signOut();
            clearAuthState();
            toast({
              variant: 'destructive',
              title: 'גישה נדחתה',
              description: 'משתמש זה אינו מנהל. אנא ודא את סטטוס המנהל שלך.',
            });
          }
        }
      } catch (error) {
        console.error("Error handling session change:", error);
        // Don't auto-sign out on errors here to prevent login loops
      }
    } else {
      setAdminUser(null);
    }
    
    setLoading(false);
  };

  // Set up auth state management
  useEffect(() => {
    let mounted = true;
    
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth state...");
        setLoading(true);
        
        // First, get the current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error getting session:", sessionError);
          if (mounted) {
            clearAuthState();
            setLoading(false);
          }
          return;
        }
        
        // Process the initial session
        if (mounted && sessionData.session) {
          await handleSessionChange(sessionData.session);
        } else if (mounted) {
          clearAuthState();
          setLoading(false);
        }
        
        // Set up the auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            console.log("Auth state changed:", event, currentSession?.user?.id);
            
            if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
              if (mounted) {
                clearAuthState();
                setLoading(false);
              }
              return;
            }
            
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
              if (mounted && currentSession) {
                await handleSessionChange(currentSession);
              }
            }
          }
        );
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error in auth initialization:', error);
        if (mounted) {
          clearAuthState();
          setLoading(false);
        }
      }
    };
    
    initializeAuth();
    
    return () => {
      mounted = false;
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      console.log("Signing in with email:", email);
      
      // Clear any existing auth state first
      clearAuthState();
      
      // First, sign out to ensure a clean state (fixes many token issues)
      await supabase.auth.signOut();
      
      // Attempt sign in
      const { data, error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (authError) {
        throw authError;
      }
      
      if (!data.user) {
        throw new Error('לא התקבלו פרטי משתמש מהשרת');
      }
      
      console.log("Auth successful for user ID:", data.user.id);
      
      // Check if user is admin
      const adminData = await fetchAdminUser(data.user.id);
      
      if (!adminData) {
        console.log("User is not an admin, signing out");
        await supabase.auth.signOut();
        clearAuthState();
        throw new Error('משתמש זה אינו מנהל. אנא ודא את סטטוס המנהל שלך.');
      }
      
      // Update state with authenticated user
      setSession(data.session);
      setUser(data.user);
      setAdminUser(adminData);
      
      console.log("Admin authentication successful");
      
      toast({
        title: 'ברוך שובך!',
        description: 'התחברת בהצלחה.',
      });
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Ensure we're in a clean state
      await supabase.auth.signOut();
      clearAuthState();
      
      toast({
        variant: 'destructive',
        title: 'שגיאת אימות',
        description: error.message || 'ההתחברות נכשלה',
      });
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log("Signing out...");
    setLoading(true);
    
    try {
      // Clear browser storage to prevent stale token issues
      await supabase.auth.signOut();
      clearAuthState();
      
      toast({
        title: 'התנתקת',
        description: 'התנתקת בהצלחה.',
      });
    } catch (error: any) {
      console.error("Signout error:", error);
      
      // Force clear state even on errors
      clearAuthState();
      
      toast({
        variant: 'destructive',
        title: 'שגיאה',
        description: error.message || 'ההתנתקות נכשלה',
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    user,
    adminUser,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!adminUser,
    isSuperAdmin: adminUser?.is_super_admin || false,
  };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};