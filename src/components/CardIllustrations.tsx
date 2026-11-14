import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import coolingCardImg from '../assets/images/mascot_cooling_scene_1794666318632.jpg';
import comfortCardImg from '../assets/images/mascot_comfort_scene_1794666318969.jpg';
import heatingCardImg from '../assets/images/mascot_heating_scene_1794666318658.jpg';

/**
 * Uploaded Naph brand mark rendered cleanly on light surfaces with mix-blend-multiply.
 */
export function BrandSphereLogo({ className = 'w-7 h-7' }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[#171717] text-[#FAF8F4] font-brand font-bold text-xs ${className}`}
        aria-hidden="true"
      >
        N
      </span>
    );
  }

  return (
    <img
      src="/assets/aistudio/file_00000000448c820e9110ef748e7dd070_aab933c5.png"
      alt="Naph logo"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={`object-contain mix-blend-multiply select-none ${className}`}
    />
  );
}

/**
 * Three overlapping circular mascot previews + dark arrow badge + hand-drawn burst lines.
 */
export function HeroClimateCircles() {
  return (
    <div className="relative inline-flex items-center">
      <svg
        viewBox="0 0 28 24"
        fill="none"
        className="w-5 h-5 -mt-6 -mr-1 text-[#171717]"
        aria-hidden="true"
      >
        <motion.path
          d="M11 19L5 13M17 15L14 6M23 13L24 5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      <div className="flex items-center -space-x-2">
        <div className="w-7 h-7 rounded-full ring-2 ring-[#FAF8F4] overflow-hidden">
          <img
            src={coolingCardImg}
            alt="Cooling mascot preview"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-125"
          />
        </div>

        <div className="w-7 h-7 rounded-full ring-2 ring-[#FAF8F4] overflow-hidden">
          <img
            src={comfortCardImg}
            alt="Comfort mascot preview"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-125"
          />
        </div>

        <div className="w-7 h-7 rounded-full ring-2 ring-[#FAF8F4] overflow-hidden">
          <img
            src={heatingCardImg}
            alt="Heating mascot preview"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-125"
          />
        </div>

        <div className="w-7 h-7 rounded-full ring-2 ring-[#FAF8F4] bg-[#161616] text-white flex items-center justify-center">
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}

/**
 * Hand-drawn airflow breeze lines on the left side of the hero headline.
 */
export function LeftHeadlineDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M8 21C16 15 26 15 34 21C38 24 44 23 46 18"
        stroke="#171717"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M12 33C20 27 30 27 38 33C42 36 47 35 48 31"
        stroke="#171717"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M18 43C24 39 31 39 36 43"
        stroke="#171717"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/**
 * Hand-drawn curly airflow loop ink doodle on the right side of the hero headline.
 */
export function RightHeadlineDoodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" fill="none" className={className} aria-hidden="true">
      <motion.path
        d="M14 10C26 5 42 12 40 23C38.5 30.5 26 30.5 25.5 24C25 18.5 34.5 17 41.5 23C49.5 30 47.5 44 33 48"
        stroke="#171717"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

interface CardArtworkProps {
  src: string;
  alt: string;
  label: string;
  fallbackBg: string;
  variant?: 'hero' | 'card';
}

function CardArtwork({
  src,
  alt,
  label,
  fallbackBg,
  variant = 'hero',
}: CardArtworkProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: fallbackBg }}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full select-none ${
            variant === 'hero' ? 'object-cover object-center' : 'object-contain'
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-4 text-center">
          <span className="font-display font-bold text-sm tracking-widest text-[#171717]">
            {label}
          </span>
        </div>
      )}

      {variant === 'hero' && (
        <span className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-[#FAF8F4]/95 text-[#171717] font-display font-extrabold text-[10px] sm:text-[11px] tracking-[0.14em] px-3 py-1 rounded-full shadow-[0_2px_10px_rgba(23,23,23,0.12)] whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}

export function BlueCoolingIllustration({ variant = 'hero' }: { variant?: 'hero' | 'card' }) {
  return (
    <CardArtwork
      src={coolingCardImg}
      alt="Airwell HVAC cooling mascots in dynamic breeze scene"
      label="COOLING"
      fallbackBg="#28ACEA"
      variant={variant}
    />
  );
}

export function PinkComfortIllustration({ variant = 'hero' }: { variant?: 'hero' | 'card' }) {
  return (
    <CardArtwork
      src={comfortCardImg}
      alt="Airwell HVAC year-round comfort mascots in neighborhood scene"
      label="COMFORT"
      fallbackBg="#FAA8D0"
      variant={variant}
    />
  );
}

export function CoralHeatingIllustration({ variant = 'hero' }: { variant?: 'hero' | 'card' }) {
  return (
    <CardArtwork
      src={heatingCardImg}
      alt="Airwell HVAC warm indoor heating mascots scene"
      label="HEATING"
      fallbackBg="#F6705E"
      variant={variant}
    />
  );
}
