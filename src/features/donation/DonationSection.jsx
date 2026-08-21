import { useTranslation } from 'react-i18next';
import { Card, CardBody } from '../../components/ui/index.js';
import { Reveal, RevealGroup } from '../../components/motion/index.js';
import { DonationForm } from './DonationForm.jsx';

const IMPACT_KEYS = ['trees', 'artisan', 'festival', 'project'];

export function DonationSection() {
  const { t } = useTranslation('donation');

  return (
    <section id="donation" className="bg-accent-400 px-4 py-20 text-neutral-900 sm:px-6 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-start">
        <Reveal direction="fade-up">
          <h2 className="text-3xl font-bold sm:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-800 sm:text-lg">{t('text')}</p>

          <RevealGroup className="mt-10 grid grid-cols-2 gap-4" direction="zoom-in" step={0.06}>
            {IMPACT_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-xl border border-neutral-900/10 bg-white/40 p-4 backdrop-blur-sm"
              >
                <p className="text-lg font-extrabold">{t(`impacts.${key}.amount`)}</p>
                <p className="mt-1 text-sm font-medium text-neutral-800">
                  {t(`impacts.${key}.label`)}
                </p>
              </div>
            ))}
          </RevealGroup>
        </Reveal>

        <Reveal direction="zoom-in" delay={0.1}>
          <Card className="bg-surface-elevated text-primary-body">
            <CardBody>
              <DonationForm />
            </CardBody>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
