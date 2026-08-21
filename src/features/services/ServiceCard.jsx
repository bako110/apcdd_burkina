import { useTranslation } from 'react-i18next';
import { Card, CardBody, Button } from '../../components/ui/index.js';

export function ServiceCard({ Icon, title, summary, onOpenDetail }) {
  const { t } = useTranslation('common');

  return (
    <Card interactive className="flex h-full flex-col">
      <CardBody className="flex flex-1 flex-col">
        <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-300">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-primary-body">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{summary}</p>
        <Button variant="ghost" size="sm" className="mt-4 self-start px-0" onClick={onOpenDetail}>
          {t('buttons.learnMore')}
        </Button>
      </CardBody>
    </Card>
  );
}
