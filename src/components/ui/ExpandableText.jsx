import { useRef, useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/cn.js';

// Classes statiques (Tailwind ne résout pas les noms de classe construits
// dynamiquement au moment du scan JIT — la table doit donc être littérale).
const CLAMP_CLASSES = {
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};

/**
 * Texte long replié par défaut (clamp sur N lignes) avec un bouton
 * "Voir plus"/"Voir moins" pour le déplier — utilisé sur les pages de
 * détail (événement, actualité) pour éviter un mur de texte imposant.
 * Le bouton n'apparaît que si le texte est réellement tronqué.
 */
export function ExpandableText({ children, className, clampLines = 6 }) {
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);
  const clampClass = CLAMP_CLASSES[clampLines] ?? CLAMP_CLASSES[6];

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
  }, [children]);

  return (
    <div>
      <div
        ref={textRef}
        className={cn(
          'whitespace-pre-line text-base leading-relaxed text-primary-body',
          !expanded && clampClass,
          className,
        )}
      >
        {children}
      </div>
      {(isOverflowing || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-300"
        >
          {expanded ? t('buttons.seeLess') : t('buttons.learnMore')}
        </button>
      )}
    </div>
  );
}
