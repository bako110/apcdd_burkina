import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GalleryFilterBar } from './GalleryFilterBar.jsx';
import { GalleryGrid } from './GalleryGrid.jsx';

export function GalleryPage() {
  const { t } = useTranslation('gallery');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section className="px-4 pb-20 pt-28 sm:px-6 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-300 sm:text-4xl">
            {t('pageTitle')}
          </h1>
          <p className="mt-4 text-lg text-muted">{t('pageSubtitle')}</p>
        </div>

        <GalleryFilterBar activeFilter={activeFilter} onChange={setActiveFilter} />

        <GalleryGrid activeFilter={activeFilter} />
      </div>
    </section>
  );
}
