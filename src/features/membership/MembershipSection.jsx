import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MEMBERSHIP_PLAN_VALUES } from '../../shared/constants.js';
import { SectionHeading } from '../../components/ui/index.js';
import { Reveal, RevealGroup } from '../../components/motion/index.js';
import { MembershipPlanCard } from './MembershipPlanCard.jsx';
import { MembershipModal } from './MembershipModal.jsx';

export function MembershipSection() {
  const { t } = useTranslation('membership');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectPlan = (planKey) => {
    setSelectedPlan(planKey);
    setModalOpen(true);
  };

  return (
    <section id="membership" className="bg-primary-600 py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading title={t('title')} subtitle={t('subtitle')} light />
        </Reveal>

        <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERSHIP_PLAN_VALUES.map((planKey) => {
            const plan = t(`plans.${planKey}`, { returnObjects: true });
            return (
              <MembershipPlanCard
                key={planKey}
                planKey={planKey}
                plan={plan}
                cta={t('cta')}
                highlighted={planKey === 'actif'}
                onSelect={handleSelectPlan}
              />
            );
          })}
        </RevealGroup>
      </div>

      <MembershipModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPlan={selectedPlan}
      />
    </section>
  );
}
