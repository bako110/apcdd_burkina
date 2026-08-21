import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/index.js';

export function PartnerCard({ partner }) {
  const { t } = useTranslation('partners');

  return (
    <Card interactive className="flex h-full flex-col items-center text-center">
      <CardBody className="flex flex-1 flex-col items-center">
        <div className="flex h-20 w-full items-center justify-center">
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="max-h-16 w-auto object-contain"
          />
        </div>
        <h3 className="mt-4 text-base font-semibold text-primary-body">{partner.name}</h3>
        {partner.type && (
          <span className="mt-1 text-xs font-medium uppercase tracking-wide text-primary-500">
            {partner.type}
          </span>
        )}
        {partner.description && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
            {partner.description}
          </p>
        )}
        {partner.website && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:underline dark:text-primary-300"
          >
            {t('visitWebsite')}
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </CardBody>
    </Card>
  );
}
