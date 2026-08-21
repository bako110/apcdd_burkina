import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donationSchema } from '../../shared/schemas.js';
import {
  PAYMENT_METHOD_VALUES,
  DONATION_PURPOSE_VALUES,
  SUGGESTED_DONATION_AMOUNTS,
} from '../../shared/constants.js';
import {
  Input,
  Select,
  FieldLabel,
  FieldError,
  Checkbox,
  RadioOption,
  Button,
} from '../../components/ui/index.js';
import { useToast } from '../../components/ui/ToastProvider.jsx';
import { useSubmitDonation } from './useSubmitDonation.js';

export function DonationForm() {
  const { t } = useTranslation('forms');
  const { t: tDonation } = useTranslation('donation');
  const { showToast } = useToast();
  const submitDonation = useSubmitDonation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: SUGGESTED_DONATION_AMOUNTS[0],
      customAmount: '',
      donorName: '',
      donorEmail: '',
      donorPhone: '',
      donationPurpose: DONATION_PURPOSE_VALUES[0],
      paymentMethod: '',
      anonymous: false,
    },
  });

  const isAnonymous = watch('anonymous');

  const onSubmit = async (data) => {
    const { customAmount, ...rest } = data;
    const parsedCustomAmount = Number(customAmount);
    const finalAmount =
      customAmount && !Number.isNaN(parsedCustomAmount) && parsedCustomAmount > 0
        ? parsedCustomAmount
        : rest.amount;

    const payload = { ...rest, amount: finalAmount };

    try {
      await submitDonation.mutateAsync(payload);
      showToast(tDonation('form.success'), 'success');
      reset();
    } catch (error) {
      showToast(error?.message || tDonation('form.error'), 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h3 className="text-xl font-bold text-primary-body">{tDonation('form.title')}</h3>

      <div>
        <FieldLabel htmlFor="amount" required>{tDonation('form.amount')}</FieldLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SUGGESTED_DONATION_AMOUNTS.map((value) => (
            <RadioOption
              key={value}
              id={`amount-${value}`}
              value={value}
              label={value.toLocaleString('fr-FR')}
              {...register('amount')}
            />
          ))}
        </div>
        <FieldError message={errors.amount?.message && t(errors.amount.message)} />
      </div>

      <div>
        <FieldLabel htmlFor="customAmount">{tDonation('form.customAmount')}</FieldLabel>
        <Input
          id="customAmount"
          type="number"
          min="0"
          step="1"
          {...register('customAmount')}
        />
      </div>

      <div>
        <Checkbox
          id="anonymous"
          label={tDonation('form.anonymous')}
          {...register('anonymous')}
        />
      </div>

      {!isAnonymous && (
        <>
          <div>
            <FieldLabel htmlFor="donorName" required>{tDonation('form.donorName')}</FieldLabel>
            <Input id="donorName" {...register('donorName')} error={errors.donorName} />
            <FieldError message={errors.donorName?.message && t(errors.donorName.message)} />
          </div>
          <div>
            <FieldLabel htmlFor="donorEmail" required>{tDonation('form.donorEmail')}</FieldLabel>
            <Input
              id="donorEmail"
              type="email"
              {...register('donorEmail')}
              error={errors.donorEmail}
            />
            <FieldError message={errors.donorEmail?.message && t(errors.donorEmail.message)} />
          </div>
          <div>
            <FieldLabel htmlFor="donorPhone" required>{tDonation('form.donorPhone')}</FieldLabel>
            <Input
              id="donorPhone"
              type="tel"
              {...register('donorPhone')}
              error={errors.donorPhone}
            />
            <FieldError message={errors.donorPhone?.message && t(errors.donorPhone.message)} />
          </div>
        </>
      )}

      <div>
        <FieldLabel htmlFor="donationPurpose" required>{tDonation('form.purpose')}</FieldLabel>
        <Select id="donationPurpose" {...register('donationPurpose')} error={errors.donationPurpose}>
          {DONATION_PURPOSE_VALUES.map((purposeKey) => (
            <option key={purposeKey} value={purposeKey}>
              {tDonation(`form.purposes.${purposeKey}`)}
            </option>
          ))}
        </Select>
        <FieldError message={errors.donationPurpose?.message && t(errors.donationPurpose.message)} />
      </div>

      <div>
        <FieldLabel htmlFor="paymentMethod" required>{tDonation('form.paymentMethod')}</FieldLabel>
        <Select
          id="paymentMethod"
          {...register('paymentMethod')}
          error={errors.paymentMethod}
          defaultValue=""
        >
          <option value="" disabled>{tDonation('form.paymentMethodPlaceholder')}</option>
          {PAYMENT_METHOD_VALUES.map((methodKey) => (
            <option key={methodKey} value={methodKey}>
              {tDonation(`form.paymentMethods.${methodKey}`)}
            </option>
          ))}
        </Select>
        <FieldError message={errors.paymentMethod?.message && t(errors.paymentMethod.message)} />
      </div>

      <Button type="submit" variant="accent" className="w-full" loading={isSubmitting}>
        {tDonation('form.submit')}
      </Button>
    </form>
  );
}
