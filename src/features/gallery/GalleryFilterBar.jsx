import { useTranslation } from 'react-i18next';
import { GALLERY_CATEGORY_VALUES } from '../../shared/constants.js';
import { cn } from '../../lib/cn.js';

const FILTERS = ['all', ...GALLERY_CATEGORY_VALUES];

export function GalleryFilterBar({ activeFilter, onChange }) {
  const { t } = useTranslation('gallery');

  return (
    <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeFilter === filter
              ? 'bg-primary-500 text-white shadow-sm'
              : 'bg-surface-sunken text-primary-body hover:bg-primary-50 dark:hover:bg-primary-950',
          )}
        >
          {t(`filters.${filter}`)}
        </button>
      ))}
    </div>
  );
}
