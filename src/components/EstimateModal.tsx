import { toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Mail, X } from 'lucide-react';
import { HVAC_SERVICES } from '../data/hvac';
import { EstimateSubmissionResult, submitEstimateRequest } from '../lib/estimateSubmission';

interface EstimateModalProps {
  isOpen: boolean;
  defaultService?: string;
  onClose: () => void;
}

const SERVICE_OPTIONS = HVAC_SERVICES.map((s) => s.title);

export function EstimateModal({
  isOpen,
  defaultService = SERVICE_OPTIONS[0],
  onClose,
}: EstimateModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceNeeded, setServiceNeeded] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EstimateSubmissionResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setServiceNeeded(
      SERVICE_OPTIONS.includes(defaultService ?? "") ? (defaultService ?? "") : (SERVICE_OPTIONS[0] ?? "")
    );
    setError('');
    setResult(null);
    setCopied(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, defaultService, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }
    if (trimmedPhone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const submission = await submitEstimateRequest({
        fullName: trimmedName,
        phone: trimmedPhone,
        email: trimmedEmail,
        serviceNeeded: serviceNeeded ?? "",
        message: message.trim(),
        source: 'modal',
      });
      setResult(submission);
      if (submission.mode === 'demo') toast.warning('This is just a demo', { description: 'Message sending is not set up, so nothing was sent.' });
    } catch {
      setError('Unable to reach the configured estimate endpoint. Please try again or use email.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="estimate-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white rounded-3xl border border-black/10 shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-brand text-xs font-bold tracking-[-0.02em] text-[#6B6761]">Naph</p>
            <h2 id="estimate-modal-title" className="font-display text-xl font-bold text-[#171717] mt-1">
              {result ? 'Estimate details ready' : 'Request a free estimate'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full border border-black/10 hover:bg-[#FAF8F4] flex items-center justify-center text-[#171717] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {result ? (
          <div className="mt-5 space-y-4">
            {result.mode === 'live' ? (
              <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-black/[0.08] flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#161616] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-sm text-[#3A3835] leading-relaxed">{result.statusText}</p>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-2xl bg-[#FAF8F4] border border-black/[0.08] space-y-2">
                  <p className="text-xs font-semibold text-[#171717]">
                    Demo only &mdash; your message was NOT sent
                  </p>
                  <p className="text-xs text-[#5E5B56] leading-relaxed">
                    This site is a demo and message sending is not set up yet. Nothing was delivered to anyone. Below is a preview of what would be sent:
                  </p>
                  <pre className="mt-2 p-3 bg-white border border-black/[0.08] rounded-xl text-[11.5px] text-[#171717] whitespace-pre-wrap font-sans leading-relaxed">
                    {result.formattedSummary}
                  </pre>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={result.mailtoHref}
                    className="inline-flex items-center justify-center gap-2 bg-[#161616] hover:bg-[#2B2B2B] text-white text-xs font-medium py-2.5 px-4 rounded-xl transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open Email Draft (demo address)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(result.formattedSummary)}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF8F4] text-[#171717] border border-black/10 text-xs font-medium py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                  </button>
                </div>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-full border border-black/10 hover:bg-[#FAF8F4] text-[#171717] text-sm font-medium py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
            <div>
              <label htmlFor="est-name" className="block text-xs font-medium text-[#3A3835] mb-1">
                Full Name
              </label>
              <input
                id="est-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jordan Miller"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="est-phone" className="block text-xs font-medium text-[#3A3835] mb-1">
                  Phone Number
                </label>
                <input
                  id="est-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(000) 000-0000"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717]"
                />
              </div>
              <div>
                <label htmlFor="est-email" className="block text-xs font-medium text-[#3A3835] mb-1">
                  Email Address
                </label>
                <input
                  id="est-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="est-service" className="block text-xs font-medium text-[#3A3835] mb-1">
                Service Needed
              </label>
              <select
                id="est-service"
                value={serviceNeeded}
                onChange={(e) => setServiceNeeded(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717]"
              >
                {SERVICE_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="est-message" className="block text-xs font-medium text-[#3A3835] mb-1">
                Message
              </label>
              <textarea
                id="est-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your home or commercial HVAC needs..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F4] border border-black/10 rounded-xl focus:outline-none focus:border-[#171717] resize-none"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                {error}
              </p>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={{ scale: 0.985 }}
              className="w-full bg-[#161616] hover:bg-[#2B2B2B] disabled:opacity-60 text-white text-sm font-medium py-3 rounded-xl transition-colors cursor-pointer"
            >
              {submitting ? 'Preparing Request...' : 'Get a Free Estimate'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
