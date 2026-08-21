import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

export const Checkbox = forwardRef(function Checkbox({ className, label, id, ...props }, ref) {
  return (
    <label htmlFor={id} className="flex items-start gap-2.5 text-sm text-primary-body">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className={cn(
          'mt-0.5 size-4 rounded border-subtle text-primary-500 focus:ring-2 focus:ring-primary-400/40',
          className,
        )}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
});

export const RadioOption = forwardRef(function RadioOption(
  { id, label, className, ...props },
  ref,
) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex cursor-pointer items-center justify-center rounded-lg border border-subtle px-3 py-2 text-sm font-medium',
        'transition-colors has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-700',
        'dark:has-[:checked]:bg-primary-900/40 dark:has-[:checked]:text-primary-200',
        className,
      )}
    >
      <input ref={ref} id={id} type="radio" className="sr-only" {...props} />
      {label}
    </label>
  );
});
