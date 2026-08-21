import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Changer de langue"
      className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold uppercase transition-colors hover:bg-black/5 dark:hover:bg-white/10"
    >
      <Languages className="size-4" />
      {i18n.language === 'fr' ? 'FR' : 'EN'}
    </button>
  );
}
