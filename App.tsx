import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { Testimonials } from './components/Testimonials';
import { BenefitList } from './components/BenefitList';
import { FinalCTA } from './components/FinalCTA';
import { Page2 } from './components/Page2';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'page2'>('landing');
  const [isLoading, setIsLoading] = useState(false);

  const handleNextPage = () => {
    setIsLoading(true);
    // Simulate navigation delay
    setTimeout(() => {
      setIsLoading(false);
      setView('page2');
      window.scrollTo(0, 0);
    }, 1200);
  };

  if (view === 'page2') {
    return <Page2 />;
  }

  return (
    <main className="min-h-screen font-sans selection:bg-summer-200 selection:text-acai-900">
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
             <Loader2 className="w-10 h-10 text-acai-600 animate-spin" />
             <span className="font-heading font-bold text-acai-800">Carregando próxima etapa...</span>
          </div>
        </div>
      )}

      <Hero onNext={handleNextPage} />
      <ProblemSolution />
      <Testimonials onNext={handleNextPage} />
      <BenefitList />
      <FinalCTA onNext={handleNextPage} />

    </main>
  );
};

export default App;