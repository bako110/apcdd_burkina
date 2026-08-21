import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '../components/ui/index.js';

export function NotFoundPage() {
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <Compass className="size-16 text-primary-500" />
      <h1 className="font-display text-3xl font-bold text-primary-body">{t('notFound.title')}</h1>
      <p className="text-muted">{t('notFound.description')}</p>
      <Link to="/">
        <Button>{t('buttons.backToHome')}</Button>
      </Link>
    </div>
  );
}
