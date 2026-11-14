import condenser from '../assets/images/hvac_condenser.png';
import thermostat from '../assets/images/hvac_thermostat.png';
import radiator from '../assets/images/hvac_radiator.png';
import filter from '../assets/images/hvac_filter.png';

const SRC = { condenser, thermostat, radiator, filter } as const;
const ALT = {
  condenser: 'Illustrated outdoor AC condenser',
  thermostat: 'Illustrated smart thermostat',
  radiator: 'Illustrated heating radiator',
  filter: 'Illustrated air filter',
} as const;

/** Static (non-animated) HVAC illustration placed in a section corner. */
export function HvacDecor({ item, className = '' }: { item: keyof typeof SRC; className?: string }) {
  return (
    <img
      src={SRC[item]}
      alt={ALT[item]}
      loading="lazy"
      className={`hvac-decor pointer-events-none select-none absolute hidden md:block ${className}`}
    />
  );
}
