import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button, Card, CardSkeletonGrid, SectionHeading } from '../../components/ui/index.js';
import { Reveal, RevealGroup } from '../../components/motion/index.js';
import { useEvents } from './useEvents.js';
import { EventCard } from './EventCard.jsx';

export function EventsSection() {
  const { t } = useTranslation('events');
  const { data, isLoading, isError } = useEvents();
  const events = data?.slice(0, 2) ?? [];

  return (
    <section id="events" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        {isLoading && <CardSkeletonGrid count={2} />}

        {!isLoading && isError && (
          <p className="text-center text-sm text-muted">{t('error')}</p>
        )}

        {!isLoading && !isError && events.length === 0 && (
          <Card className="mx-auto flex max-w-md flex-col items-center gap-3 p-10 text-center">
            <Calendar className="size-10 text-muted" aria-hidden="true" />
            <p className="text-muted">{t('empty')}</p>
          </Card>
        )}

        {!isLoading && !isError && events.length > 0 && (
          <RevealGroup className="grid gap-6 sm:grid-cols-2">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </RevealGroup>
        )}

        <div className="mt-10 text-center">
          <Link to="/evenements">
            <Button variant="outline">{t('seeAll')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
