import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/cn.js';

const colorVariants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm',
  accent: 'bg-accent-400 text-neutral-900 hover:bg-accent-500 shadow-sm',
  outline:
    'border border-primary-500 text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950',
  ghost: 'text-primary-600 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-950',
  danger: 'bg-danger-500 text-white hover:bg-danger-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props },
  ref,
) {
  const prefersReduced = useReducedMotion();
  const isDisabled = disabled || loading;

  const shineEnabled = !isDisabled && !prefersReduced;

  return (
    <motion.button
      ref={ref}
      disabled={isDisabled}
      initial="rest"
      whileHover={shineEnabled ? 'hover' : undefined}
      whileTap={!isDisabled && !prefersReduced ? { scale: 0.97 } : undefined}
      animate="rest"
      variants={shineEnabled ? { rest: { scale: 1 }, hover: { scale: 1.035 } } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        colorVariants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {shineEnabled && (
        <motion.span
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          variants={{ rest: { x: '-100%' }, hover: { x: '100%' } }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
      )}
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </motion.button>
  );
});
