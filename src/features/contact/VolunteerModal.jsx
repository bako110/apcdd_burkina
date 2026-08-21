import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { volunteerSchema } from '../../shared/schemas.js';
import { Modal } from '../../components/ui/Modal.jsx';
import { Input, Textarea, Select, FieldLabel, FieldError, Button } from '../../components/ui/index.js';
import { useToast } from '../../components/ui/ToastProvider.jsx';

export function VolunteerModal({ open, onClose }) {
  const { t } = useTranslation('forms');
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(volunteerSchema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 400));
    showToast(t('volunteer.success'), 'success');
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={t('volunteer.title')}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FieldLabel htmlFor="volunteerName" required>{t('volunteer.name')}</FieldLabel>
          <Input id="volunteerName" {...register('volunteerName')} error={errors.volunteerName} />
          <FieldError message={errors.volunteerName?.message && t(errors.volunteerName.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="volunteerEmail" required>{t('volunteer.email')}</FieldLabel>
          <Input id="volunteerEmail" type="email" {...register('volunteerEmail')} error={errors.volunteerEmail} />
          <FieldError message={errors.volunteerEmail?.message && t(errors.volunteerEmail.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="volunteerPhone" required>{t('volunteer.phone')}</FieldLabel>
          <Input id="volunteerPhone" type="tel" {...register('volunteerPhone')} error={errors.volunteerPhone} />
          <FieldError message={errors.volunteerPhone?.message && t(errors.volunteerPhone.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="volunteerSkills" required>{t('volunteer.skills')}</FieldLabel>
          <Textarea id="volunteerSkills" rows={2} {...register('volunteerSkills')} error={errors.volunteerSkills} />
          <FieldError message={errors.volunteerSkills?.message && t(errors.volunteerSkills.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="volunteerAvailability" required>{t('volunteer.availability')}</FieldLabel>
          <Select id="volunteerAvailability" {...register('volunteerAvailability')} error={errors.volunteerAvailability} defaultValue="">
            <option value="" disabled>{t('volunteer.availabilityPlaceholder')}</option>
            <option value="weekdays">{t('volunteer.availabilityOptions.weekdays')}</option>
            <option value="weekends">{t('volunteer.availabilityOptions.weekends')}</option>
            <option value="evenings">{t('volunteer.availabilityOptions.evenings')}</option>
            <option value="flexible">{t('volunteer.availabilityOptions.flexible')}</option>
          </Select>
          <FieldError message={errors.volunteerAvailability?.message && t(errors.volunteerAvailability.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="volunteerMotivation" required>{t('volunteer.motivation')}</FieldLabel>
          <Textarea id="volunteerMotivation" rows={3} {...register('volunteerMotivation')} error={errors.volunteerMotivation} />
          <FieldError message={errors.volunteerMotivation?.message && t(errors.volunteerMotivation.message)} />
        </div>
        <Button type="submit" variant="accent" className="w-full" loading={isSubmitting}>
          {t('volunteer.submit')}
        </Button>
      </form>
    </Modal>
  );
}
