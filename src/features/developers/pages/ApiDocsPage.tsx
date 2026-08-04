'use client';

import React, { useState } from 'react';
import DeveloperHeader from '../components/DeveloperHeader';
import DeveloperHeroSection from '../components/DeveloperHeroSection';
import ApiDocsSidebar from '../components/ApiDocsSidebar';
import ApiDocsMainContent from '../components/ApiDocsMainContent';
import Footer from '@/components/layout/Footer';
import { apiDocsData, DocPage } from '../data/apiDocsData';

const defaultPage: DocPage = apiDocsData[0].items[0];

export default function ApiDocsPage() {
  const [selectedPage, setSelectedPage] = useState<DocPage>(defaultPage);

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-['Poppins']">
      <DeveloperHeader />
      <DeveloperHeroSection />

      {/* Body Area */}
      <div
        className="w-full flex flex-col lg:flex-row relative gap-0 lg:gap-6"
        style={{ paddingTop: '48px', paddingBottom: '80px' }}
      >
        <ApiDocsSidebar
          selectedId={selectedPage.id}
          onSelect={setSelectedPage}
        />
        <ApiDocsMainContent page={selectedPage} />
      </div>

      <Footer />
    </main>
  );
}
