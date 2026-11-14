import React from 'react';
import { BadgeCheck, ShieldCheck, Star, Award, MapPin, CreditCard, Phone } from 'lucide-react';

const BADGES = [
  { icon: ShieldCheck, title: 'Licensed, Bonded & Insured', note: 'License #HVAC-000000 (Demo)' },
  { icon: BadgeCheck, title: 'NATE-Certified Technicians', note: 'Industry-certified team' },
  { icon: Award, title: 'EPA 608 Certified', note: 'Safe refrigerant handling' },
  { icon: Star, title: '4.9 Rating on Google', note: '150+ reviews (Demo)' },
];

const CITIES = ['Dallas', 'Plano', 'Frisco', 'Irving', 'Arlington', 'McKinney', 'Garland', 'Richardson'];

interface Props { onOpenEstimate: (service?: string) => void }

export function TrustSection({ onOpenEstimate }: Props) {
  return (
    <section aria-label="Why homeowners trust Naph" className="px-4 sm:px-6 py-12">
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {BADGES.map(({ icon: Icon, title, note }) => (
            <div key={title} className="bg-white border border-black/[0.08] rounded-2xl p-4 flex items-start gap-3">
              <Icon className="w-5 h-5 shrink-0 text-[#28ACEA] mt-0.5" aria-hidden />
              <div>
                <div className="font-display text-sm font-bold text-[#171717] leading-snug">{title}</div>
                <div className="text-xs text-[#5A5854] mt-0.5">{note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-[#171717] text-white rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
            <CreditCard className="w-6 h-6 text-[#FAA8D0]" aria-hidden />
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em]">0% Financing Available</h2>
            <p className="text-sm text-white/75 max-w-md">
              New system? Spread the cost with low monthly payments on qualifying AC, furnace and heat pump installs. Subject to credit approval (Demo).
            </p>
            <button type="button" onClick={() => onOpenEstimate('Air Conditioning Services')}
              className="self-start bg-white text-[#171717] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#FAF8F4] transition-colors cursor-pointer">
              Check Financing Options
            </button>
          </div>

          <div className="bg-white border border-black/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
            <MapPin className="w-6 h-6 text-[#F6705E]" aria-hidden />
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#171717]">Areas We Serve</h2>
            <p className="text-sm text-[#5A5854]">Proudly serving the Dallas–Fort Worth metro and surrounding areas (Demo).</p>
            <ul className="flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <li key={c} className="text-xs font-medium text-[#3A3835] bg-[#FAF8F4] border border-black/[0.06] px-3 py-1.5 rounded-full">{c}</li>
              ))}
            </ul>
            <a href="tel:0000000000" className="inline-flex items-center gap-2 text-sm font-semibold text-[#171717]">
              <Phone className="w-4 h-4" aria-hidden /> 24/7 Emergency: (000) 000-0000 (Demo)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
