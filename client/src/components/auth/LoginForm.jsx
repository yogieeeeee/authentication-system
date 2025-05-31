import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock } from 'lucide-react';

const LoginForm = ({ 
  loginForm, 
  setLoginForm, 
  handleLogin, 
  loading, 
  error 
}) => {
  // Gunakan ref untuk menjaga fokus pada input
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Fokus ke input email saat komponen pertama kali di-render
  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  // Tangani perubahan tanpa menyebabkan re-render yang tidak perlu
  const handleEmailChange = (e) => {
    setLoginForm(prev => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setLoginForm(prev => ({ ...prev, password: e.target.value }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={emailInputRef}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={loginForm.email}
            onChange={handleEmailChange}
            // Tambahkan atribut penting untuk mobile
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={passwordInputRef}
            id="password"
            type="password"
            placeholder="Enter your password"
            className="pl-10"
            value={loginForm.password}
            onChange={handlePasswordChange}
            // Tambahkan atribut penting untuk mobile
            autoComplete="current-password"
            autoCapitalize="none"
          />
        </div>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      )}

      <Button 
        onClick={handleLogin} 
        className="w-full" 
        disabled={loading}
        // Tambahkan untuk mencegah perilaku default form
        type="button"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </div>
  );
};

export default LoginForm;