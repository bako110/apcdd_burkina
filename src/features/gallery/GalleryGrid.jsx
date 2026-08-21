import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'lucide-react';
import { Card, CardSkeletonGrid } from '../../components/ui/index.js';
import { RevealGroup } from '../../components/motion/index.js';
import { useGallery } from './useGallery.js';
import { GalleryItem } from './GalleryItem.jsx';
import { GalleryLightbox } from './GalleryLightbox.jsx';

export function GalleryGrid({ activeFilter = 'all', limit }) {
  const { t } = useTranslation('gallery');
  const { data, isLoading, isError } = useGallery();
  const [openItem, setOpenItem] = useState(null);

  const filtered = (data ?? []).filter(
    (item) => activeFilter === 'all' || item.category === activeFilter,
  );
  const items = typeof limit === 'number' ? filtered.slice(0, limit) : filtered;

  if (isLoading) {
    return <CardSkeletonGrid count={limit ?? 6} />;
  }

  if (isError) {
    return <p className="text-center text-sm text-muted">{t('error')}</p>;
  }

  if (items.length === 0) {
    return (
      <Card className="mx-auto flex max-w-md flex-col items-center gap-3 p-10 text-center">
        <Image className="size-10 text-muted" aria-hidden="true" />
        <p className="text-muted">{t('empty')}</p>
      </Card>
    );
  }

  return (
    <>
      <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <GalleryItem key={item._id} item={item} onOpen={setOpenItem} />
        ))}
      </RevealGroup>
      <GalleryLightbox item={openItem} onClose={() => setOpenItem(null)} />
    </>
  );
}
