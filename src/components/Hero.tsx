import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HERO_CARDS, HeroFeatureCard } from '../data/hvac';
import {
  BlueCoolingIllustration,
  CoralHeatingIllustration,
  HeroClimateCircles,
  LeftHeadlineDoodle,
  PinkComfortIllustration,
  RightHeadlineDoodle,
} from './CardIllustrations';

interface HeroProps {
  onOpenEstimate: (serviceName?: string) => void;
  onSelectCard: (card: HeroFeatureCard) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero({ onOpenEstimate, onSelectCard }: HeroProps) {
  return (
    <section
      id="top"
      className="relative w-full overflow-hidden pt-10 sm:pt-14 pb-0 flex flex-col items-center justify-between min-h-[calc(100vh-76px)]"
    >
      {/* 3D Perspective Grid Floor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="perspective-grid-wrapper"
        aria-hidden="true"
      >
        <div className="perspective-grid-plane" />
      </motion.div>

      {/* Hero Text & CTA Stack */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center mt-2 sm:mt-4">
        {/* Small Kicker Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: EASE_OUT_EXPO }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-5"
        >
          <HeroClimateCircles />
          <span className="text-[12.5px] sm:text-[13px] font-medium text-[#6B6761] whitespace-nowrap">
            Heating &bull; Cooling &bull; Indoor Air Quality
          </span>
        </motion.div>

        {/* Main Headline with Flanking Hand-Drawn Ink Doodles */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT_EXPO }}
          className="relative inline-block max-w-2xl"
        >
          <LeftHeadlineDoodle className="hidden sm:block absolute -left-16 md:-left-20 top-1 w-12 h-12 text-[#171717]" />
          <RightHeadlineDoodle className="hidden sm:block absolute -right-14 md:-right-18 -top-2 w-12 h-12 text-[#171717]" />

          <h1 className="font-display font-bold text-[#171717] tracking-[-0.032em] leading-[1.08] text-[2.35rem] sm:text-[3.25rem] md:text-[3.75rem] text-balance">
            Your comfort,
            <br />
            in every season.
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASE_OUT_EXPO }}
          className="mt-4 sm:mt-5 max-w-lg text-[14px] sm:text-[15px] leading-[1.55] text-[#66635E]"
        >
          Reliable heating, cooling, and air quality solutions
          <br className="hidden sm:inline" /> to keep your home comfortable all year round.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.26, ease: EASE_OUT_EXPO }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.button
            type="button"
            onClick={() => onOpenEstimate('Air Conditioning Services')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center justify-center gap-2 bg-[#161616] hover:bg-[#2B2B2B] text-white text-[13px] font-medium px-5 py-2.5 rounded-[10px] shadow-[0_2px_8px_rgba(23,23,23,0.14)] transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
          >
            <span>Get Free Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </motion.button>

          <motion.a
            href="#services"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center justify-center bg-white hover:bg-[#F5F2EC] text-[#171717] text-[13px] font-medium px-6 py-2.5 rounded-[10px] border border-black/[0.08] shadow-[0_1px_4px_rgba(23,23,23,0.04)] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
          >
            Explore Services
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom Three Overlapping Illustrated HVAC Cards */}
      <div className="relative z-10 w-full max-w-[920px] mx-auto px-3 sm:px-6 mt-12 sm:mt-16 flex items-end justify-center">
        {/* Left Blue Card — COOLING */}
        <motion.button
          type="button"
          onClick={() => onSelectCard(HERO_CARDS[0]!)}
          aria-label="Explore Cooling services"
          initial={{ opacity: 0, y: 42, rotate: -7 }}
          animate={{ opacity: 1, y: 20, rotate: -5.5 }}
          whileHover={{ y: 4, rotate: -3.5 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.55, delay: 0.3, ease: EASE_OUT_EXPO }}
          className="group relative w-[32%] min-w-[116px] max-w-[265px] aspect-[4/4.4] bg-[#28ACEA] rounded-t-[24px] sm:rounded-t-[30px] overflow-hidden -mr-4 sm:-mr-6 z-10 shadow-[0_14px_34px_rgba(23,23,23,0.08)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#171717]"
        >
          <BlueCoolingIllustration variant="hero" />
        </motion.button>

        {/* Center Pink Card — COMFORT */}
        <motion.button
          type="button"
          onClick={() => onSelectCard(HERO_CARDS[1]!)}
          aria-label="Explore Comfort and Smart Thermostat solutions"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.55, delay: 0.24, ease: EASE_OUT_EXPO }}
          className="group relative w-[37%] min-w-[134px] max-w-[295px] aspect-[4/4.5] bg-[#FAA8D0] rounded-t-[26px] sm:rounded-t-[32px] overflow-hidden z-20 shadow-[0_22px_50px_rgba(23,23,23,0.12)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#171717]"
        >
          <PinkComfortIllustration variant="hero" />
        </motion.button>

        {/* Right Coral Card — HEATING */}
        <motion.button
          type="button"
          onClick={() => onSelectCard(HERO_CARDS[2]!)}
          aria-label="Explore Heating services"
          initial={{ opacity: 0, y: 42, rotate: 7 }}
          animate={{ opacity: 1, y: 20, rotate: 5.5 }}
          whileHover={{ y: 4, rotate: 3.5 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.55, delay: 0.34, ease: EASE_OUT_EXPO }}
          className="group relative w-[32%] min-w-[116px] max-w-[265px] aspect-[4/4.4] bg-[#F6705E] rounded-t-[24px] sm:rounded-t-[30px] overflow-hidden -ml-4 sm:-ml-6 z-10 shadow-[0_14px_34px_rgba(23,23,23,0.08)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#171717]"
        >
          <CoralHeatingIllustration variant="hero" />
        </motion.button>
      </div>
    </section>
  );
}
