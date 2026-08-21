import { ChevronUp } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition.js';
import { cn } from '../../lib/cn.js';

export function ScrollToTopButton() {
  const visible = useScrollPosition(300);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Retour en haut"
      className={cn(
        'fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full',
        'bg-primary-500 text-white shadow-elevated transition-all duration-300 hover:bg-primary-600',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ChevronUp className="size-5" />
    </button>
  );
}
