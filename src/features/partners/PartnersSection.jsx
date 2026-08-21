import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Handshake } from 'lucide-react';
import { Button, Card, CardSkeletonGrid, SectionHeading } from '../../components/ui/index.js';
import { Reveal, RevealGroup } from '../../components/motion/index.js';
import { usePartners } from './usePartners.js';
import { PartnerCard } from './PartnerCard.jsx';

const HOME_LIMIT = 8;

export function PartnersSection() {
  const { t } = useTranslation('partners');
  const { data, isLoading, isError } = usePartners();
  const [showAll, setShowAll] = useState(false);

  const partners = data ?? [];
  const visiblePartners = showAll ? partners : partners.slice(0, HOME_LIMIT);

  return (
    <section id="partners" className="bg-surface-sunken px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        {isLoading && <CardSkeletonGrid count={4} />}

        {!isLoading && isError && (
          <p className="text-center text-sm text-muted">{t('error')}</p>
        )}

        {!isLoading && !isError && partners.length === 0 && (
          <Card className="mx-auto flex max-w-md flex-col items-center gap-3 p-10 text-center">
            <Handshake className="size-10 text-muted" aria-hidden="true" />
            <p className="text-muted">{t('empty')}</p>
          </Card>
        )}

        {!isLoading && !isError && partners.length > 0 && (
          <>
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visiblePartners.map((partner) => (
                <PartnerCard key={partner._id} partner={partner} />
              ))}
            </RevealGroup>

            {partners.length > HOME_LIMIT && !showAll && (
              <div className="mt-10 text-center">
                <Button variant="outline" onClick={() => setShowAll(true)}>
                  {t('seeAll')}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
