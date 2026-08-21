import { useTranslation } from 'react-i18next';
import { Share2 } from 'lucide-react';
import { Button } from '../../components/ui/index.js';
import { useToast } from '../../components/ui/ToastProvider.jsx';

export function ShareButton({ title, className, variant = 'outline', size = 'md' }) {
  const { t } = useTranslation('news');
  const { showToast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled the share sheet, nothing to do
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast(t('linkCopied'), 'info');
    } catch {
      // clipboard unavailable, silently ignore
    }
  };

  return (
    <Button variant={variant} size={size} className={className} onClick={handleShare}>
      <Share2 className="size-4" aria-hidden="true" />
      {t('share')}
    </Button>
  );
}
