import { useTranslation } from 'react-i18next';
import { Calendar } from 'lucide-react';
import { Card, CardSkeletonGrid } from '../../components/ui/index.js';
import { useEvents } from './useEvents.js';
import { EventCard } from './EventCard.jsx';

export function EventsPage() {
  const { t } = useTranslation('events');
  const { data, isLoading, isError } = useEvents();
  const events = data ?? [];

  return (
    <section className="px-4 pb-20 pt-28 sm:px-6 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center text-3xl font-bold text-primary-600 dark:text-primary-300 sm:text-4xl">
          {t('pageTitle')}
        </h1>

        {isLoading && <CardSkeletonGrid count={6} />}

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
