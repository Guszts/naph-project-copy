import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { HeroFeatureCard } from '../data/hvac';
import {
  BlueCoolingIllustration,
  CoralHeatingIllustration,
  PinkComfortIllustration,
} from './CardIllustrations';

interface ServiceDetailModalProps {
  card: HeroFeatureCard | null;
  onClose: () => void;
  onRequestEstimate: (serviceName: string) => void;
}

export function ServiceDetailModal({
  card,
  onClose,
  onRequestEstimate,
}: ServiceDetailModalProps) {
  useEffect(() => {
    if (!card) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [card, onClose]);

  if (!card) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl bg-[#FAF8F4] rounded-3xl border border-black/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.08] bg-white">
          <div>
            <div className="text-xs font-medium text-[#6B6761]">
              Naph / {card.label}
            </div>
            <h2 id="service-modal-title" className="font-display text-lg font-bold text-[#171717] mt-0.5">
              {card.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="w-9 h-9 rounded-full border border-black/10 bg-white hover:bg-[#F3F0EA] flex items-center justify-center text-[#171717] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Illustrated Feature Banner */}
        <div
          className="relative w-full py-8 px-6 flex flex-col sm:flex-row items-center gap-6"
          style={{ backgroundColor: card.cardBg }}
        >
          <div className="w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden shrink-0 shadow-sm">
            {card.theme === 'cooling' && <BlueCoolingIllustration variant="card" />}
            {card.theme === 'comfort' && <PinkComfortIllustration variant="card" />}
            {card.theme === 'heating' && <CoralHeatingIllustration variant="card" />}
          </div>
          <div className="bg-white/95 rounded-2xl border border-black/10 p-5 text-[#171717]">
            <p className="text-xs font-medium text-[#6B6761]">{card.category}</p>
            <h3 className="font-display text-lg font-bold mt-1">{card.serviceName}</h3>
            <p className="text-sm text-[#4A4743] leading-relaxed mt-2">{card.summary}</p>
          </div>
        </div>

        {/* 3-Step Service Process */}
        <div className="p-6 bg-white space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {card.highlights.map((item) => (
              <div
                key={item.step}
                className="p-3.5 rounded-xl border border-black/[0.08] bg-[#FAF8F4]"
              >
                <div className="text-[11px] font-mono tabular-nums text-[#6B6761]">{item.step}</div>
                <div className="text-xs font-semibold text-[#171717] mt-1">{item.title}</div>
                <p className="text-xs text-[#5E5B56] mt-1 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-black/[0.06]">
            <span className="text-xs text-[#6B6761]">
              Residential &amp; Commercial HVAC Services
            </span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                onClose();
                onRequestEstimate(card.serviceName);
              }}
              className="inline-flex items-center gap-2 bg-[#161616] hover:bg-[#2B2B2B] text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>Get a Free Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
