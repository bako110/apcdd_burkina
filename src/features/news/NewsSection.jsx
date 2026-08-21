import { useTranslation } from 'react-i18next';
import { Newspaper } from 'lucide-react';
import { Card, CardSkeletonGrid, SectionHeading } from '../../components/ui/index.js';
import { Reveal, RevealGroup } from '../../components/motion/index.js';
import { useNews } from './useNews.js';
import { NewsCard } from './NewsCard.jsx';
import { NewsletterForm } from '../contact/NewsletterForm.jsx';

export function NewsSection() {
  const { t } = useTranslation('news');
  const { data, isLoading, isError } = useNews();
  const news = data?.slice(0, 6) ?? [];

  return (
    <section id="news" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} />
        </Reveal>

        {isLoading && <CardSkeletonGrid count={6} />}

        {!isLoading && isError && (
          <p className="text-center text-sm text-muted">{t('error')}</p>
        )}

        {!isLoading && !isError && news.length === 0 && (
          <Card className="mx-auto flex max-w-md flex-col items-center gap-3 p-10 text-center">
            <Newspaper className="size-10 text-muted" aria-hidden="true" />
            <p className="text-muted">{t('empty')}</p>
          </Card>
        )}

        {!isLoading && !isError && news.length > 0 && (
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </RevealGroup>
        )}

        <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-surface-sunken px-6 py-10 text-center">
          <h3 className="text-xl font-semibold text-primary-body">{t('newsletter.title')}</h3>
          <p className="mt-2 text-sm text-muted">{t('newsletter.text')}</p>
          <div className="mt-6">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
