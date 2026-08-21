import { useTranslation } from 'react-i18next';
import { Drum, Leaf, HandHeart } from 'lucide-react';
import { Card, CardBody, SectionHeading } from '../../components/ui/index.js';
import { Reveal, RevealGroup } from '../../components/motion/index.js';

const CARD_ICONS = [Drum, Leaf, HandHeart];

export function AboutSection() {
  const { t } = useTranslation('home');
  const cards = t('about.cards', { returnObjects: true });

  return (
    <section id="about" className="bg-surface px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading title={t('about.title')} subtitle={t('about.subtitle')} />
        </Reveal>

        <RevealGroup className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 md:gap-8">
          {Array.isArray(cards) &&
            cards.map((card, index) => {
              const Icon = CARD_ICONS[index % CARD_ICONS.length];
              return (
                <Card key={card.title} interactive>
                  <CardBody>
                    <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-300">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-body">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{card.text}</p>
                  </CardBody>
                </Card>
              );
            })}
        </RevealGroup>
      </div>
    </section>
  );
}
