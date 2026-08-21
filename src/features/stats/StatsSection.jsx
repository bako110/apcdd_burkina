import { useTranslation } from 'react-i18next';
import { Counter } from '../../components/ui/index.js';
import { Reveal } from '../../components/motion/index.js';
import { useHeroContent } from '../hero/useHeroContent.js';

const STAT_KEYS = [
  { field: 'activeMembers', labelKey: 'stats.activeMembers' },
  { field: 'projectsDone', labelKey: 'stats.projectsDone' },
  { field: 'treesPlanted', labelKey: 'stats.treesPlanted' },
  { field: 'villagesTouched', labelKey: 'stats.villagesTouched' },
];

export function StatsSection() {
  const { t } = useTranslation('home');
  const { data } = useHeroContent();
  const stats = data?.stats;

  return (
    <section className="bg-primary-600 px-4 py-16 dark:bg-primary-700 sm:px-6">
      <Reveal direction="zoom-in" className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
        {STAT_KEYS.map(({ field, labelKey }) => (
          <div key={field} className="flex flex-col items-center">
            <Counter target={stats?.[field] ?? 0} className="text-4xl font-bold text-white" />
            <span className="mt-2 text-sm font-medium text-white/85">{t(labelKey)}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
