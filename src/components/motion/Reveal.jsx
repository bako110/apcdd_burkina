import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];

const VARIANTS = {
  'fade-up': {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function Reveal({
  as = motion.div,
  direction = 'fade-up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.25,
  className,
  children,
  ...rest
}) {
  const prefersReduced = useReducedMotion();

  const htmlTag = typeof as === 'string' ? as : 'div';

  if (prefersReduced) {
    const StaticTag = htmlTag;
    return (
      <StaticTag className={className} {...rest}>
        {children}
      </StaticTag>
    );
  }

  const Tag = typeof as === 'string' ? motion[as] ?? motion.div : as;

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={VARIANTS[direction] ?? VARIANTS['fade-up']}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
