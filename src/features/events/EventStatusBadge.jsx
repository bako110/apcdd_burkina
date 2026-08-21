import { useTranslation } from 'react-i18next';
import { Badge } from '../../components/ui/index.js';

const STATUS_TONES = {
  upcoming: 'warning',
  ongoing: 'success',
  completed: 'info',
  cancelled: 'danger',
};

export function EventStatusBadge({ status }) {
  const { t } = useTranslation('events');

  return (
    <Badge tone={STATUS_TONES[status] ?? 'neutral'}>
      {t(`status.${status}`, t('status.unknown'))}
    </Badge>
  );
}
