import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = ({ 
  loginForm, 
  setLoginForm, 
  handleLogin, 
  loading, 
  error, 
  setCurrentPage 
}) => {
  return (
    <AuthLayout 
      title="Welcome Back"
      description="Use imaginary email"
    >
      <LoginForm 
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        handleLogin={handleLogin}
        loading={loading}
        error={error}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button
            onClick={() => setCurrentPage("register")}
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;