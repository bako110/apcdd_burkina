import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, SectionHeading } from '../../components/ui/index.js';
import { Reveal } from '../../components/motion/index.js';
import { GalleryFilterBar } from './GalleryFilterBar.jsx';
import { GalleryGrid } from './GalleryGrid.jsx';

export function GallerySection() {
  const { t } = useTranslation('gallery');
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <section id="gallery" className="bg-surface-sunken px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        <GalleryFilterBar activeFilter={activeFilter} onChange={setActiveFilter} />

        <GalleryGrid activeFilter={activeFilter} limit={6} />

        <div className="mt-10 text-center">
          <Link to="/galerie">
            <Button variant="outline">{t('discoverMore')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
