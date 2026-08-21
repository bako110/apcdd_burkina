import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quickContactSchema } from '../../shared/schemas.js';
import { Input, Textarea, Button } from '../../components/ui/index.js';
import { useToast } from '../../components/ui/ToastProvider.jsx';
import { cn } from '../../lib/cn.js';

export function QuickContactForm({ compact = false }) {
  const { t } = useTranslation('forms');
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(quickContactSchema) });

  const onSubmit = async () => {
    try {
      await new Promise((r) => setTimeout(r, 400));
      showToast(t('contact.success'), 'success');
      reset();
    } catch {
      showToast(t('contact.error'), 'error');
    }
  };

  const fieldClass = compact ? 'text-sm' : '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
      <Input
        {...register('name')}
        placeholder={t('contact.namePlaceholder')}
        error={errors.name}
        className={cn(fieldClass, compact && 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400')}
      />
      <Input
        {...register('email')}
        type="email"
        placeholder={t('contact.emailPlaceholder')}
        error={errors.email}
        className={cn(fieldClass, compact && 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400')}
      />
      <Input
        {...register('phone')}
        type="tel"
        placeholder={t('contact.phonePlaceholder')}
        error={errors.phone}
        className={cn(fieldClass, compact && 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400')}
      />
      <Textarea
        {...register('message')}
        rows={3}
        placeholder={t('contact.messagePlaceholder')}
        error={errors.message}
        className={cn(fieldClass, compact && 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400')}
      />
      <Button type="submit" size="sm" className="w-full" loading={isSubmitting}>
        {t('contact.quickTitle') && '✉'} Envoyer
      </Button>
    </form>
  );
}
