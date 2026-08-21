import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../../components/ui/index.js';
import { Reveal, RevealGroup } from '../../components/motion/index.js';
import { ServiceCard } from './ServiceCard.jsx';
import { ServiceDetailModal } from './ServiceDetailModal.jsx';
import { SERVICE_ICONS } from './servicesData.js';

export function ServicesSection() {
  const { t } = useTranslation('home');
  const items = t('services.items', { returnObjects: true });
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="bg-surface-sunken px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading title={t('services.title')} subtitle={t('services.subtitle')} />
        </Reveal>

        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(items) &&
            items.map((item) => (
              <ServiceCard
                key={item.key}
                Icon={SERVICE_ICONS[item.key]}
                title={item.title}
                summary={item.summary}
                onOpenDetail={() => setSelectedService(item)}
              />
            ))}
        </RevealGroup>
      </div>

      <ServiceDetailModal
        open={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </section>
  );
}
