import { HvacDecor } from './HvacDecor';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Copy, Mail } from 'lucide-react';
import {
  ABOUT_CARDS,
  HVAC_FAQS,
  HVAC_SERVICES,
  HvacServiceItem,
  MAINTENANCE_PLANS,
  SOLUTIONS_PILLARS,
} from '../data/hvac';
import {
  DEMO_CONTACT,
  EstimateSubmissionResult,
  submitEstimateRequest,
} from '../lib/estimateSubmission';
import {
  BrandSphereLogo,
  ServiceCardImage,
} from './CardIllustrations';

interface BelowFoldSectionsProps {
  onOpenEstimate: (serviceName?: string) => void;
}

const CATEGORIES = ['All Services', 'Cooling', 'Heating', 'Air Quality & Controls'] as const;
const SERVICE_OPTIONS = HVAC_SERVICES.map((s) => s.title);
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT_CONFIG = { once: true, amount: 0.16 } as const;

export function BelowFoldSections({ onOpenEstimate }: BelowFoldSectionsProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All Services');
  const [propertyScope, setPropertyScope] = useState<'residential' | 'commercial'>('residential');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(SERVICE_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<EstimateSubmissionResult | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredServices: HvacServiceItem[] =
    activeCategory === 'All Services'
      ? HVAC_SERVICES
      : HVAC_SERVICES.filter((s) => s.category === activeCategory);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setFormError('Please enter your full name.');
      return;
    }
    if (trimmedPhone.replace(/\D/g, '').length < 7) {
      setFormError('Please enter a valid phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please provide a valid email address.');
      return;
    }

    setFormError('');
    setSubmitting(true);

    try {
      const res = await submitEstimateRequest({
        fullName: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        serviceNeeded: serviceNeeded ?? "",
        message: message.trim(),
        source: 'contact-section',
      });
      setSubmitResult(res);
      setCopied(false);
    } catch {
      setFormError('Unable to reach the configured estimate endpoint. Please verify configuration or use email.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopySummary = async (summary: string) => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative z-20 bg-[#FAF8F4] border-t border-black/[0.08]">
      {/* Solutions Section */}
      <section id="solutions" className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-24">
        <HvacDecor item="filter" className="right-6 top-14 w-36" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium text-[#6B6761]">Solutions</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#171717] mt-2 text-balance">
            Practical climate control built for every season
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5E5B56]">
            From summer air conditioning performance to winter heating reliability and clean indoor airflow, every service follows a transparent diagnostic and care process.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SOLUTIONS_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_CONFIG}
              transition={{ duration: 0.42, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-2xl border border-black/[0.08] p-7 flex flex-col justify-between transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(23,23,23,0.05)]"
            >
              <div>
                <div className="font-display text-sm font-bold text-[#171717] tabular-nums">
                  {pillar.number}
                </div>
                <h3 className="font-display text-lg font-bold text-[#171717] mt-3">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#5E5B56]">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-black/[0.06] text-xs font-medium text-[#6B6761]">
                {pillar.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 border-t border-black/[0.07]">
        <HvacDecor item="condenser" className="right-[38%] top-6 w-32" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#6B6761]">Services</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#171717] mt-2">
              Explore our HVAC services
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter HVAC services by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white border border-black/[0.08] rounded-xl self-start md:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#161616] text-white'
                      : 'text-[#5E5B56] hover:text-[#171717]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div layout className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.article
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.96, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                className="group bg-white rounded-2xl border border-black/[0.08] overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(23,23,23,0.06)] transition-shadow duration-200"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onOpenEstimate(service.title)}
                    aria-label={`Request estimate for ${service.title}`}
                    className="relative w-full aspect-[16/10] flex items-center justify-center overflow-hidden cursor-pointer"
                    style={{ backgroundColor: service.cardBg }}
                  >
                    <div className="w-full h-full transition-transform duration-300 ease-out ">
                      <ServiceCardImage id={service.id} bg={service.cardBg} />
                    </div>
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-[#161616] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition-transform duration-200 group-hover:translate-x-0.5">
                      <span>Get a Free Estimate</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </button>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-[#6B6761]">
                      <span>{service.category}</span>
                      <span aria-hidden="true">/</span>
                      <span>{service.audience}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#171717] mt-2">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5E5B56]">
                      {service.description}
                    </p>
                    <ul className="mt-4 space-y-1.5 text-xs text-[#4A4743]">
                      {service.included.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#171717] shrink-0" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenEstimate(service.title)}
                    className="text-xs font-semibold text-[#171717] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Schedule Service
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Maintenance Section */}
      <section id="maintenance" className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 border-t border-black/[0.07]">
        <HvacDecor item="thermostat" className="right-6 top-10 w-28" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs font-medium text-[#6B6761]">Maintenance</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-[#171717] mt-2">
              Preventive care built around your schedule
            </h2>
          </div>

          <div className="inline-flex items-center gap-1 p-1 bg-white border border-black/[0.08] rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setPropertyScope('residential')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                propertyScope === 'residential'
                  ? 'bg-[#161616] text-white'
                  : 'text-[#5E5B56] hover:text-[#171717]'
              }`}
            >
              Residential
            </button>
            <button
              type="button"
              onClick={() => setPropertyScope('commercial')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                propertyScope === 'commercial'
                  ? 'bg-[#161616] text-white'
                  : 'text-[#5E5B56] hover:text-[#171717]'
              }`}
            >
              Commercial
            </button>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {MAINTENANCE_PLANS.map((plan, idx) => {
            const description =
              propertyScope === 'residential' ? plan.residentialDetail : plan.commercialDetail;
            const features =
              propertyScope === 'residential' ? plan.residentialFeatures : plan.commercialFeatures;
            const preselectedService =
              propertyScope === 'commercial' ? 'Commercial HVAC' : 'HVAC Maintenance';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.42, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                className={`rounded-2xl p-8 border flex flex-col justify-between ${
                  plan.highlighted
                    ? 'bg-[#161616] text-white border-[#161616]'
                    : 'bg-white text-[#171717] border-black/[0.08]'
                }`}
              >
                <motion.div
                  key={`${plan.id}-${propertyScope}`}
                  initial={{ opacity: 0.6, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                    <span
                      className={`text-xs font-medium ${
                        plan.highlighted ? 'text-white/75' : 'text-[#6B6761]'
                      }`}
                    >
                      {plan.scope}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      plan.highlighted ? 'text-white/80' : 'text-[#5E5B56]'
                    }`}
                  >
                    {description}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-sm">
                    {features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                            plan.highlighted ? 'bg-[#FCD65B]' : 'bg-[#171717]'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={plan.highlighted ? 'text-white/90' : 'text-[#3A3835]'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => onOpenEstimate(preselectedService)}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-8 w-full py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    plan.highlighted
                      ? 'bg-white text-[#161616] hover:bg-[#FAF8F4]'
                      : 'bg-[#161616] text-white hover:bg-[#2B2B2B]'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 border-t border-black/[0.07]">
        <HvacDecor item="radiator" className="left-6 bottom-6 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-medium text-[#6B6761]">About Us</p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.025em] text-[#171717] mt-2 text-balance">
              <span className="font-brand tracking-[-0.04em]">Naph</span> &mdash; Residential &amp; Commercial Climate Care
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5E5B56]">
              Designed for U.S. homeowners and commercial property managers who want clear communication, dependable seasonal service, and easy online estimate requests without corporate clutter.
            </p>
            <div className="mt-6 pt-6 border-t border-black/[0.08] flex flex-wrap gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenEstimate('Air Conditioning Services')}
                className="inline-flex items-center gap-2 bg-[#161616] hover:bg-[#2B2B2B] text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>Get a Free Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.button>
              <a
                href="#services"
                className="inline-flex items-center justify-center bg-white hover:bg-[#F5F2EC] text-[#171717] text-xs font-medium px-4 py-2.5 rounded-xl border border-black/10 transition-colors"
              >
                Explore Our Services
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ABOUT_CARDS.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_CONFIG}
                transition={{ duration: 0.42, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                className="bg-white rounded-2xl border border-black/[0.08] p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-base font-bold text-[#171717]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E5B56]">{card.body}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/[0.06] text-xs font-medium text-[#6B6761]">
                  {card.footnote}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & FAQ Section */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-8 py-20 border-t border-black/[0.07]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6"
          >
            <p className="text-xs font-medium text-[#6B6761]">Contact &amp; FAQ</p>
            <h2 className="font-display text-3xl font-bold tracking-[-0.025em] text-[#171717] mt-2">
              Common HVAC questions
            </h2>

            <div className="mt-8 divide-y divide-black/[0.08] border-y border-black/[0.08]">
              {HVAC_FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="font-display text-base font-semibold text-[#171717]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#6B6761] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                        >
                          <p className="pb-5 text-sm leading-relaxed text-[#5E5B56] pr-6">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-5 rounded-2xl bg-white border border-black/[0.08] space-y-1.5">
              <p className="text-xs font-semibold text-[#171717]">Demonstration Contact Information</p>
              <p className="text-xs text-[#5E5B56]">{DEMO_CONTACT.areaLabel}</p>
              <p className="text-xs text-[#5E5B56]">
                Phone: {DEMO_CONTACT.phoneLabel} &middot; Email: {DEMO_CONTACT.email}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE_OUT_EXPO }}
            className="lg:col-span-6"
          >
            <div className="bg-white rounded-2xl border border-black/[0.08] p-7">
              <h3 className="font-display text-xl font-bold text-[#171717]">
                Contact Us &mdash; Get a Free Estimate
              </h3>
              <p className="mt-1.5 text-sm text-[#5E5B56]">
                Share your contact details and the HVAC service you need.
              </p>

              {submitResult ? (
                <div className="mt-6 space-y-4">
                  {submitResult.mode === 'live' ? (
                    <div className="p-4 rounded-xl bg-[#FAF8F4] border border-black/[0.08] flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#161616] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm text-[#171717]">{submitResult.statusText}</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#FAF8F4] border border-black/[0.08] space-y-3">
                      <p className="text-xs font-semibold text-[#171717]">
                        Demo Mode &mdash; Estimate Summary Prepared
                      </p>
                      <p className="text-xs text-[#5E5B56] leading-relaxed">
                        This demonstration environment is ready for real form integration via{' '}
                        <code className="font-mono">VITE_ESTIMATE_ENDPOINT</code>. Send or copy your prepared request below:
                      </p>
                      <pre className="p-3 bg-white border border-black/[0.08] rounded-xl text-xs text-[#171717] whitespace-pre-wrap font-sans leading-relaxed">
                        {submitResult.formattedSummary}
                      </pre>
                      <div className="flex flex-wrap gap-2.5">
                        <a
                          href={submitResult.mailtoHref}
                          className="inline-flex items-center gap-2 bg-[#161616] hover:bg-[#2B2B2B] text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open Email Draft</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopySummary(submitResult.formattedSummary)}
                          className="inline-flex items-center gap-2 bg-white hover:bg-[#F5F2EC] text-[#171717] border border-black/10 text-xs font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setSubmitResult(null)}
                    className="text-xs font-semibold text-[#171717] hover:underline underline-offset-4 cursor-pointer"
                  >
                    Prepare another estimate request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#3A3835] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jordan Miller"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-medium text-[#3A3835] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(000) 000-0000"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-[#3A3835] mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-medium text-[#3A3835] mb-1.5">
                      Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717]"
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-msg" className="block text-xs font-medium text-[#3A3835] mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-msg"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your heating, cooling, thermostat, or indoor air quality needs..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717] resize-none"
                    />
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                    >
                      {formError}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileTap={{ scale: 0.985 }}
                    className="w-full bg-[#161616] hover:bg-[#2B2B2B] disabled:opacity-60 text-white text-sm font-medium py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    {submitting ? 'Preparing Request...' : 'Schedule Service'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="border-t border-black/[0.08] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrandSphereLogo className="w-6 h-6" />
            <span className="font-brand text-[17px] font-bold tracking-[-0.04em] text-[#171717]">Naph</span>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B6761]">
            <a href="#services" className="hover:text-[#171717] transition-colors">Services</a>
            <a href="#solutions" className="hover:text-[#171717] transition-colors">Solutions</a>
            <a href="#maintenance" className="hover:text-[#171717] transition-colors">Maintenance</a>
            <a href="#about" className="hover:text-[#171717] transition-colors">About Us</a>
            <a href="#contact" className="hover:text-[#171717] transition-colors">Contact</a>
          </nav>

          <p className="text-xs text-[#6B6761]">
            &copy; {new Date().getFullYear()} Naph &middot; Demo Brand Showcase.
          </p>
        </div>
      </footer>
    </div>
  );
}
