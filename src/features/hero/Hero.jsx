import { useTranslation } from 'react-i18next';
import { Button, Skeleton, Counter } from '../../components/ui/index.js';
import { useSectionLink } from '../../hooks/useSectionLink.js';
import { HeroSlideshow } from './HeroSlideshow.jsx';
import { useHeroContent } from './useHeroContent.js';

const FALLBACK_TITLE = 'Association pour la Promotion de la Culture et du Développement Durable';
const FALLBACK_DESCRIPTION =
  "Nous œuvrons pour un avenir harmonieux entre tradition culturelle africaine et innovation durable, au service des communautés du Burkina Faso.";

const STAT_KEYS = [
  { field: 'activeMembers', labelKey: 'stats.activeMembers' },
  { field: 'projectsDone', labelKey: 'stats.projectsDone' },
  { field: 'treesPlanted', labelKey: 'stats.treesPlanted' },
  { field: 'villagesTouched', labelKey: 'stats.villagesTouched' },
];

export function Hero() {
  const { t } = useTranslation('home');
  const { data, isLoading, isError } = useHeroContent();
  const goToSection = useSectionLink();

  const title = isError ? FALLBACK_TITLE : data?.about?.title;
  const description = isError ? FALLBACK_DESCRIPTION : data?.about?.description;
  const stats = data?.stats;

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <HeroSlideshow />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-32 text-center sm:px-6">
        {isLoading ? (
          <div className="w-full max-w-2xl space-y-4">
            <Skeleton className="mx-auto h-10 w-3/4" />
            <Skeleton className="mx-auto h-4 w-full" />
            <Skeleton className="mx-auto h-4 w-5/6" />
          </div>
        ) : (
          <>
            <h1 className="animate-slide-up font-display text-4xl font-bold text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
              {title || FALLBACK_TITLE}
            </h1>
            <p className="mt-6 max-w-2xl animate-slide-up text-lg text-white/90 sm:text-xl">
              {description || FALLBACK_DESCRIPTION}
            </p>
          </>
        )}

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a href="/" onClick={goToSection('about')}>
            <Button className="bg-white text-primary-700 hover:bg-white/90" size="lg">
              {t('hero.discoverMission')}
            </Button>
          </a>
          <a href="/" onClick={goToSection('membership')}>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 dark:text-white"
            >
              {t('hero.joinUs')}
            </Button>
          </a>
        </div>

        <div className="mt-16 grid w-full grid-cols-2 gap-8 border-t border-white/20 pt-10 sm:grid-cols-4">
          {STAT_KEYS.map(({ field, labelKey }) => (
            <div key={field} className="flex flex-col items-center">
              <Counter target={stats?.[field] ?? 0} className="text-3xl font-bold text-white sm:text-4xl" />
              <span className="mt-2 text-sm text-white/80">{t(labelKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
