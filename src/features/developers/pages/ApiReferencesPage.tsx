'use client';

import React, { useState } from 'react';
import DeveloperHeader from '../components/DeveloperHeader';
import DeveloperHeroSection from '../components/DeveloperHeroSection';
import ApiReferencesSidebar from '../components/ApiReferencesSidebar';
import ApiReferencesMainContent from '../components/ApiReferencesMainContent';
import Footer from '@/components/layout/Footer';
import { apiReferencesData, ApiEndpoint } from '../data/apiReferencesData';

const defaultEndpoint: ApiEndpoint = apiReferencesData[0].items[0];

export default function ApiReferencesPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(defaultEndpoint);

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-['Poppins']">
      <DeveloperHeader />
      <DeveloperHeroSection />

      {/* Body Area */}
      <div
        className="w-full flex flex-col lg:flex-row relative gap-0 lg:gap-6"
        style={{ paddingTop: '48px', paddingBottom: '80px' }}
      >
        <ApiReferencesSidebar
          selectedId={selectedEndpoint.id}
          onSelect={setSelectedEndpoint}
        />
        <ApiReferencesMainContent endpoint={selectedEndpoint} />
      </div>

      <Footer />
    </main>
  );
}
