
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PharmacySearch from '@/components/pharmacy/PharmacySearch';

const PharmacySearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <PharmacySearch />
      </main>
      <Footer />
    </div>
  );
};

export default PharmacySearchPage;
