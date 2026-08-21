import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from '../../shared/schemas.js';
import { MEMBERSHIP_PLAN_VALUES } from '../../shared/constants.js';
import { Modal } from '../../components/ui/Modal.jsx';
import { Input, Textarea, Select, FieldLabel, FieldError, Button } from '../../components/ui/index.js';
import { useToast } from '../../components/ui/ToastProvider.jsx';
import { useSubmitMembership } from './useSubmitMembership.js';

export function MembershipModal({ open, onClose, initialPlan }) {
  const { t } = useTranslation('forms');
  const { t: tMembership } = useTranslation('membership');
  const { showToast } = useToast();
  const submitMembership = useSubmitMembership();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues: { membershipPlan: initialPlan || '' },
  });

  useEffect(() => {
    if (open) {
      reset({ membershipPlan: initialPlan || '' });
    }
  }, [open, initialPlan, reset]);

  const onSubmit = async (data) => {
    try {
      await submitMembership.mutateAsync(data);
      showToast(tMembership('form.success'), 'success');
      reset();
      onClose();
    } catch (error) {
      showToast(error?.message || tMembership('form.error'), 'error');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={tMembership('form.title')}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <FieldLabel htmlFor="membershipPlan" required>{tMembership('form.plan')}</FieldLabel>
          <Select
            id="membershipPlan"
            {...register('membershipPlan')}
            error={errors.membershipPlan}
            defaultValue=""
          >
            <option value="" disabled>{tMembership('form.planPlaceholder')}</option>
            {MEMBERSHIP_PLAN_VALUES.map((planKey) => (
              <option key={planKey} value={planKey}>
                {tMembership(`plans.${planKey}.name`)}
              </option>
            ))}
          </Select>
          <FieldError message={errors.membershipPlan?.message && t(errors.membershipPlan.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="fullName" required>{tMembership('form.fullName')}</FieldLabel>
          <Input id="fullName" {...register('fullName')} error={errors.fullName} />
          <FieldError message={errors.fullName?.message && t(errors.fullName.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="email" required>{tMembership('form.email')}</FieldLabel>
          <Input id="email" type="email" {...register('email')} error={errors.email} />
          <FieldError message={errors.email?.message && t(errors.email.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="phone" required>{tMembership('form.phone')}</FieldLabel>
          <Input id="phone" type="tel" {...register('phone')} error={errors.phone} />
          <FieldError message={errors.phone?.message && t(errors.phone.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="city" required>{tMembership('form.city')}</FieldLabel>
          <Input
            id="city"
            placeholder={tMembership('form.cityPlaceholder')}
            {...register('city')}
            error={errors.city}
          />
          <FieldError message={errors.city?.message && t(errors.city.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="profession" required>{tMembership('form.profession')}</FieldLabel>
          <Input id="profession" {...register('profession')} error={errors.profession} />
          <FieldError message={errors.profession?.message && t(errors.profession.message)} />
        </div>
        <div>
          <FieldLabel htmlFor="motivation" required>{tMembership('form.motivation')}</FieldLabel>
          <Textarea
            id="motivation"
            rows={3}
            placeholder={tMembership('form.motivationPlaceholder')}
            {...register('motivation')}
            error={errors.motivation}
          />
          <FieldError message={errors.motivation?.message && t(errors.motivation.message)} />
        </div>
        <div>
          <label className="flex items-start gap-2.5 text-sm text-primary-body">
            <input
              type="checkbox"
              className="mt-0.5 size-4 rounded border-subtle text-primary-500 focus:ring-2 focus:ring-primary-400/40"
              {...register('termsAgreement')}
            />
            <span>{tMembership('form.termsAgreement')}</span>
          </label>
          <FieldError message={errors.termsAgreement?.message && t(errors.termsAgreement.message)} />
        </div>
        <Button type="submit" variant="accent" className="w-full" loading={isSubmitting}>
          {tMembership('form.submit')}
        </Button>
      </form>
    </Modal>
  );
}
