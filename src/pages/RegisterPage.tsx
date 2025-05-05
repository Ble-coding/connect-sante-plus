
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 flex items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md w-full mx-4">
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
