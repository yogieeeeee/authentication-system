import React from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = ({ 
  registerForm, 
  setRegisterForm, 
  handleRegister, 
  loading, 
  error, 
  success, 
  setCurrentPage 
}) => {
  return (
    <AuthLayout 
      title="Create Account"
      description="Use imaginary email"
    >
      <RegisterForm 
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        handleRegister={handleRegister}
        loading={loading}
        error={error}
        success={success}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={() => setCurrentPage("login")}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;