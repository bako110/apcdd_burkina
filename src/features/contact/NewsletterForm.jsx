import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema } from '../../shared/schemas.js';
import { Input, Button } from '../../components/ui/index.js';
import { useToast } from '../../components/ui/ToastProvider.jsx';

export function NewsletterForm() {
  const { t } = useTranslation('news');
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 300));
    showToast(t('newsletter.success'), 'success');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row sm:justify-center">
      <Input
        {...register('email')}
        type="email"
        placeholder={t('newsletter.placeholder')}
        error={errors.email}
        className="sm:w-72 bg-white/95 text-neutral-900"
      />
      <Button type="submit" variant="accent" loading={isSubmitting}>
        {t('newsletter.title') && 'S\'abonner'}
      </Button>
    </form>
  );
}
