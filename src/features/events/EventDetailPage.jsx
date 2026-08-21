import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import { Button, Skeleton, ExpandableText } from '../../components/ui/index.js';
import { formatDateToMonthYear } from '../../lib/formatDate.js';
import { useEventBySlug } from './useEvents.js';
import { EventStatusBadge } from './EventStatusBadge.jsx';

export function EventDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation('events');
  const { data: event, isLoading, isError } = useEventBySlug(slug);

  return (
    <section className="px-4 pb-20 pt-28 sm:px-6 lg:pb-28">
      <div className="mx-auto max-w-3xl">
        <Link to="/evenements">
          <Button variant="ghost" size="sm" className="mb-8 px-0">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t('back')}
          </Button>
        </Link>

        {isLoading && (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        )}

        {!isLoading && (isError || !event) && (
          <p className="text-center text-sm text-muted">{t('notFound')}</p>
        )}

        {!isLoading && !isError && event && (
          <article>
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="mb-8 h-64 w-full rounded-2xl object-cover sm:h-80"
              />
            ) : (
              <div className="mb-8 flex h-64 w-full items-center justify-center rounded-2xl bg-surface-sunken sm:h-80">
                <Calendar className="size-16 text-muted" aria-hidden="true" />
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                {formatDateToMonthYear(event.date, i18n.language)}
              </p>
              <EventStatusBadge status={event.status} />
            </div>

            <h1 className="mt-2 font-display text-3xl font-bold text-primary-body sm:text-4xl">
              {event.title}
            </h1>

            {event.location && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                <span>{event.location}</span>
              </div>
            )}

            <ExpandableText className="mt-8">{event.description}</ExpandableText>
          </article>
        )}
      </div>
    </section>
  );
}
