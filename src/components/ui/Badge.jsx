import { cn } from '../../lib/cn.js';

const tones = {
  success: 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200',
  warning: 'bg-accent-100 text-accent-800 dark:bg-accent-900/40 dark:text-accent-200',
  info: 'bg-info-50 text-info-600 dark:bg-info-500/20 dark:text-info-500',
  danger: 'bg-danger-50 text-danger-600 dark:bg-danger-500/20 dark:text-danger-500',
  neutral: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200',
};

export function Badge({ tone = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
