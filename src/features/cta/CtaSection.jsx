import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { UserPlus, Heart, HeartHandshake } from 'lucide-react';
import { Button } from '../../components/ui/index.js';
import { Reveal } from '../../components/motion/index.js';
import { useSectionLink } from '../../hooks/useSectionLink.js';
import { VolunteerModal } from '../contact/VolunteerModal.jsx';

export function CtaSection() {
  const { t } = useTranslation('home');
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const goToSection = useSectionLink();

  return (
    <section className="bg-primary-700 py-20 text-white">
      <Reveal direction="zoom-in" className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t('cta.title')}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{t('cta.text')}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="/" onClick={goToSection('membership')}>
            <Button className="bg-white text-primary-700 hover:bg-neutral-100">
              <UserPlus className="size-4" /> {t('cta.becomeMember')}
            </Button>
          </a>
          <a href="/" onClick={goToSection('donation')}>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Heart className="size-4" /> {t('cta.support')}
            </Button>
          </a>
          <Button variant="accent" onClick={() => setVolunteerOpen(true)}>
            <HeartHandshake className="size-4" /> {t('cta.volunteer')}
          </Button>
        </div>
      </Reveal>
      <VolunteerModal open={volunteerOpen} onClose={() => setVolunteerOpen(false)} />
    </section>
  );
}
