import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn.js';

export function Card({ className, elevated = true, interactive = false, children, ...props }) {
  const prefersReduced = useReducedMotion();

  const classes = cn(
    'rounded-2xl border border-subtle bg-surface-elevated transition-shadow duration-300',
    elevated && 'shadow-elevated hover:shadow-lg',
    className,
  );

  if (!interactive) {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={classes}
      whileHover={prefersReduced ? undefined : { y: -6, scale: 1.02, rotate: -0.5 }}
      whileTap={prefersReduced ? undefined : { scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardBody({ className, children, ...props }) {
  return (
    <div className={cn('p-6 sm:p-8', className)} {...props}>
      {children}
    </div>
  );
}
