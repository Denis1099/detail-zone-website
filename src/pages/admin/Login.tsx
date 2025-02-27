
import React, { useState } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, isAuthenticated } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || 'Invalid credentials. Please check your email and password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 p-8 rounded-xl bg-card border border-primary/10 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-text">Admin Access</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Alert className="my-4 bg-secondary/10 border-secondary/20">
          <Info className="h-4 w-4 text-secondary" />
          <AlertDescription className="text-sm">
            If you need admin access, please contact an existing admin user.
          </AlertDescription>
        </Alert>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="admin@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
