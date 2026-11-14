import React, { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { BelowFoldSections } from './BelowFoldSections';
import { EstimateModal } from './EstimateModal';
import { Hero } from './Hero';
import { Navbar } from './Navbar';
import { ServiceDetailModal } from './ServiceDetailModal';
import type { HeroFeatureCard } from '../data/hvac';

export function App() {
  const [selectedCard, setSelectedCard] = useState<HeroFeatureCard | null>(null);
  const [estimateOpen, setEstimateOpen] = useState(false);
  const [defaultService, setDefaultService] = useState('Air Conditioning Services');

  const handleOpenEstimate = (serviceName = 'Air Conditioning Services') => {
    setDefaultService(serviceName);
    setEstimateOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#FAF8F4] text-[#171717] flex flex-col">
        <Navbar onOpenQuote={() => handleOpenEstimate('Air Conditioning Services')} />

        <main className="flex-1">
          <Hero
            onOpenEstimate={handleOpenEstimate}
            onSelectCard={(card) => setSelectedCard(card)}
          />

          <BelowFoldSections onOpenEstimate={handleOpenEstimate} />
        </main>

        <AnimatePresence>
          {selectedCard && (
            <ServiceDetailModal
              key={selectedCard.id}
              card={selectedCard}
              onClose={() => setSelectedCard(null)}
              onRequestEstimate={handleOpenEstimate}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {estimateOpen && (
            <EstimateModal
              key="estimate-modal"
              isOpen={estimateOpen}
              defaultService={defaultService}
              onClose={() => setEstimateOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
