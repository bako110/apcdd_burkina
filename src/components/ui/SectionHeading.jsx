import { cn } from '../../lib/cn.js';

export function SectionHeading({ title, subtitle, align = 'center', light = false, className }) {
  return (
    <div
      className={cn(
        'mb-12 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <h2
        className={cn(
          'text-3xl font-bold sm:text-4xl',
          light ? 'text-white' : 'text-primary-600 dark:text-primary-300',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-lg', light ? 'text-white/85' : 'text-muted')}>{subtitle}</p>
      )}
    </div>
  );
}
