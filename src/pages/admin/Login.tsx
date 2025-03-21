import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, isAuthenticated, loading: authLoading, signOut } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const clearSession = async () => {
      if (!isAuthenticated && !authLoading) {
        try {
          await supabase.auth.signOut();
        } catch (error) {
          console.error("Error clearing session:", error);
        }
      }
    };
    
    clearSession();
  }, [isAuthenticated, authLoading]);

  if (isAuthenticated && !authLoading) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('נא למלא את כל השדות');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      
      if (error.message?.includes('Invalid login credentials')) {
        setError('פרטי התחברות שגויים. אנא בדוק את האימייל והסיסמה שלך.');
      } else if (error.message?.includes('אינו מנהל')) {
        setError('משתמש זה אינו רשום כמנהל במערכת.');
      } else {
        setError(error.message || 'אירעה שגיאה במהלך ההתחברות. אנא נסה שוב.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAndRetry = async () => {
    try {
      setIsLoading(true);
      await signOut();
      setEmail('');
      setPassword('');
      setError(null);
      toast({
        title: 'נתוני הכניסה נוקו',
        description: 'ניתן לנסות להתחבר שוב.',
      });
    } catch (error) {
      console.error("Error in clear and retry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background" dir="rtl">
      <div className="w-full max-w-md space-y-6 p-8 rounded-xl bg-card border border-primary/10 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-text">כניסת מנהל</h2>
          <p className="mt-2 text-sm text-muted-foreground">התחבר כדי לגשת ללוח הבקרה</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="my-4 text-right">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 mr-auto" 
              onClick={handleClearAndRetry}
              disabled={isLoading}
            >
              <RefreshCw className="h-3 w-3 mr-1" /> נקה ונסה שוב
            </Button>
          </Alert>
        )}
        
        <Alert className="my-4 bg-secondary/10 border-secondary/20 text-right">
          <Info className="h-4 w-4 text-secondary" />
          <AlertDescription className="text-sm">
            אם אתה צריך גישת מנהל, אנא צור קשר עם מנהל קיים.
          </AlertDescription>
        </Alert>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text text-right">
                כתובת אימייל
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 text-right"
                placeholder="admin@example.com"
                disabled={isLoading || authLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text text-right">
                סיסמה
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 text-right"
                placeholder="••••••••"
                disabled={isLoading || authLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || authLoading}
          >
            {isLoading || authLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> מתחבר...
              </>
            ) : (
              'התחבר'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
