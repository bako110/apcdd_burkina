import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import hero01 from '../../assets/images/hero/hero-slide-01.jpg';
import hero02 from '../../assets/images/hero/hero-slide-02.jpg';
import hero03 from '../../assets/images/hero/hero-slide-03.jpg';
import hero04 from '../../assets/images/hero/hero-slide-04.jpg';
import hero05 from '../../assets/images/hero/hero-slide-05.jpg';
import hero06 from '../../assets/images/hero/hero-slide-06.jpg';
import hero07 from '../../assets/images/hero/hero-slide-07.jpg';
import hero08 from '../../assets/images/hero/hero-slide-08.jpg';

const SLIDES = [hero01, hero02, hero03, hero04, hero05, hero06, hero07, hero08];
const INTERVAL_MS = 10000;
const KEN_BURNS_DURATION_S = INTERVAL_MS / 1000 + 1.2;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {SLIDES.map((slide, slideIndex) => {
        const isActive = slideIndex === index;
        return (
          <motion.div
            key={slide}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide})` }}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: prefersReduced ? 1 : isActive ? [1.05, 1.16] : 1.05,
            }}
            transition={{
              opacity: { duration: 1, ease: 'easeInOut' },
              scale: isActive
                ? { duration: KEN_BURNS_DURATION_S, ease: 'linear' }
                : { duration: 0 },
            }}
            aria-hidden={!isActive}
          />
        );
      })}

      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--color-hero-gradient-from), var(--color-hero-gradient-to))',
        }}
        animate={prefersReduced ? { opacity: 0.35 } : { opacity: [0.3, 0.45, 0.3] }}
        transition={prefersReduced ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0" style={{ backgroundColor: 'var(--color-hero-overlay)' }} />
    </div>
  );
}
