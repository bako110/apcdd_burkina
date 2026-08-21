import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/index.js';
import { formatDate } from '../../lib/formatDate.js';
import { buildSlug } from '../../lib/slug.js';

const CATEGORY_BANNER_CLASSES = {
  culture: 'bg-primary-500',
  award: 'bg-accent-400',
};
const DEFAULT_BANNER_CLASS = 'bg-info-500';

export function NewsCard({ news }) {
  const { t, i18n } = useTranslation('news');
  const bannerClass = CATEGORY_BANNER_CLASSES[news.category] ?? DEFAULT_BANNER_CLASS;

  return (
    <Link to={`/actualites/${buildSlug(news._id, news.title)}`} className="block h-full">
      <Card interactive className="flex h-full flex-col overflow-hidden">
        <div className={`relative h-40 w-full overflow-hidden ${bannerClass}`}>
          {news.image && (
            <img src={news.image} alt={news.title} className="h-full w-full object-cover" />
          )}
        </div>

        <CardBody className="flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
            {formatDate(news.date, i18n.language)}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-primary-body">{news.title}</h3>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
            {news.summary}
          </p>
          <span className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-300">
            {t('readMore')}
          </span>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Eye className="size-4" aria-hidden="true" />
            <span>
              {news.views ?? 0} {t('views')}
            </span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
