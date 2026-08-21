import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import { Button, Skeleton, ExpandableText } from '../../components/ui/index.js';
import { formatDate } from '../../lib/formatDate.js';
import { useNewsBySlug } from './useNews.js';
import { ShareButton } from './ShareButton.jsx';

export function NewsDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation('news');
  const { data: news, isLoading, isError } = useNewsBySlug(slug);

  return (
    <section className="px-4 pb-20 pt-28 sm:px-6 lg:pb-28">
      <div className="mx-auto max-w-3xl">
        <Link to="/">
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

        {!isLoading && (isError || !news) && (
          <p className="text-center text-sm text-muted">{t('notFound')}</p>
        )}

        {!isLoading && !isError && news && (
          <article>
            {news.image && (
              <img
                src={news.image}
                alt={news.title}
                className="mb-8 h-64 w-full rounded-2xl object-cover sm:h-80"
              />
            )}

            <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
              {formatDate(news.date, i18n.language)}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-primary-body sm:text-4xl">
              {news.title}
            </h1>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Eye className="size-4" aria-hidden="true" />
                <span>
                  {news.views ?? 0} {t('views')}
                </span>
              </div>
              <ShareButton title={news.title} size="sm" />
            </div>

            <ExpandableText className="mt-8">{news.content}</ExpandableText>
          </article>
        )}
      </div>
    </section>
  );
}
