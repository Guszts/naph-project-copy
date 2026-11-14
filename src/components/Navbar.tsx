import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { BrandSphereLogo } from './CardIllustrations';

interface NavbarProps {
  onOpenQuote: () => void;
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Maintenance', href: '#maintenance' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenQuote }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full pt-5 px-4 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-fit pointer-events-auto relative"
      >
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-between gap-4 sm:gap-7 bg-white/95 backdrop-blur-sm border border-black/[0.08] rounded-full pl-3 pr-1.5 py-1.5 shadow-[0_2px_14px_rgba(23,23,23,0.04)]"
        >
          {/* Zone 1: Naph logo + wordmark */}
          <a
            href="#top"
            aria-label="Naph home"
            className="flex items-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717] shrink-0"
          >
            <BrandSphereLogo className="w-6 h-6" />
            <span className="font-brand font-bold text-[17px] tracking-[-0.04em] leading-none text-[#171717] whitespace-nowrap">
              Naph
            </span>
          </a>

          {/* Zone 2: Desktop single-line navigation links */}
          <div className="hidden md:flex items-center gap-6 text-[12.5px] font-medium text-[#5A5854]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#171717] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#171717] rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Zone 3: Primary CTA + Mobile menu toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              onClick={onOpenQuote}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.14 }}
              className="bg-[#161616] hover:bg-[#2B2B2B] text-white text-[12px] font-medium px-4 py-1.5 rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
            >
              Get a Quote
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-full text-[#171717] hover:bg-black/5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#171717]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Animated Mobile navigation drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute left-0 right-0 top-full mt-2 bg-white border border-black/10 rounded-2xl p-3 shadow-[0_12px_32px_rgba(23,23,23,0.1)] flex flex-col gap-1 origin-top"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 text-sm font-medium text-[#3A3835] hover:text-[#171717] hover:bg-[#FAF8F4] rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
