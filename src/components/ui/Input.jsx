import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

const fieldClasses = cn(
  'w-full rounded-lg border border-subtle bg-surface px-4 py-2.5 text-sm text-primary-body',
  'placeholder:text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400/40',
  'disabled:cursor-not-allowed disabled:opacity-60',
);

export const Input = forwardRef(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(fieldClasses, error && 'border-danger-500 focus:ring-danger-500/30', className)}
      {...props}
    />
  );
});

export const Textarea = forwardRef(function Textarea({ className, error, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(fieldClasses, error && 'border-danger-500 focus:ring-danger-500/30', className)}
      {...props}
    />
  );
});

export const Select = forwardRef(function Select({ className, error, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(fieldClasses, error && 'border-danger-500 focus:ring-danger-500/30', className)}
      {...props}
    >
      {children}
    </select>
  );
});

export function FieldLabel({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-primary-body">
      {children}
      {required && <span className="text-danger-500"> *</span>}
    </label>
  );
}

export function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-danger-500">{message}</p>;
}
