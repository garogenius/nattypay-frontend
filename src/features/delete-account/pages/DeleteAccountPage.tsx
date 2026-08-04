import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DeleteAccountForm from '../components/DeleteAccountForm';
import ContactSocialSection from '@/features/contact/components/ContactSocialSection';

export default function DeleteAccountPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header />
      <DeleteAccountForm />
      <ContactSocialSection />
      <Footer />
    </main>
  );
}
