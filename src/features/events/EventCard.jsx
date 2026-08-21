import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/index.js';
import { formatDateToMonthYear } from '../../lib/formatDate.js';
import { buildSlug } from '../../lib/slug.js';
import { EventStatusBadge } from './EventStatusBadge.jsx';

const DESCRIPTION_TRUNCATE_LENGTH = 140;

export function EventCard({ event }) {
  const { t, i18n } = useTranslation('events');
  const description = event.description || '';
  const isTruncated = description.length > DESCRIPTION_TRUNCATE_LENGTH;

  return (
    <Link to={`/evenements/${buildSlug(event._id, event.title)}`} className="block h-full">
      <Card interactive className="flex h-full flex-col overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden bg-surface-sunken">
          {event.image ? (
            <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">
              <Calendar className="size-12" aria-hidden="true" />
            </div>
          )}
          <div className="absolute right-3 top-3">
            <EventStatusBadge status={event.status} />
          </div>
        </div>

        <CardBody className="flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
            {formatDateToMonthYear(event.date, i18n.language)}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-primary-body">{event.title}</h3>
          <p className="mt-3 flex-1 line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>
          {isTruncated && (
            <span className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-300">
              {t('readMore')}
            </span>
          )}
          {event.location && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span>{event.location}</span>
            </div>
          )}
        </CardBody>
      </Card>
    </Link>
  );
}
