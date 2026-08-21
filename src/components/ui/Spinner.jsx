import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/cn.js';

export function Spinner({ className, size = 'md' }) {
  const sizes = { sm: 'size-4', md: 'size-8', lg: 'size-12' };
  return (
    <Loader2 className={cn('animate-spin text-primary-500', sizes[size], className)} aria-hidden="true" />
  );
}

export function CenteredSpinner({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <Spinner size="lg" />
      {label && <p className="text-sm text-muted">{label}</p>}
    </div>
  );
}
