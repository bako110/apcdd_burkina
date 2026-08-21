import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Users } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition.js';
import { useSectionLink } from '../../hooks/useSectionLink.js';
import { ThemeToggle } from './ThemeToggle.jsx';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';
import { Button } from '../ui/Button.jsx';
import { cn } from '../../lib/cn.js';
import logo from '../../assets/images/brand/logo.jpg';

const NAV_LINKS = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'services', key: 'services' },
  { id: 'events', key: 'events' },
  { id: 'gallery', key: 'gallery' },
  { id: 'news', key: 'news' },
  { id: 'partners', key: 'partners' },
  { id: 'contact', key: 'contact' },
];

export function Navbar() {
  const { t } = useTranslation();
  const scrolled = useScrollPosition(50);
  const [open, setOpen] = useState(false);
  const goToSection = useSectionLink();

  const isSolid = scrolled || open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isSolid ? 'bg-surface shadow-sm' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img src={logo} alt="APCDD" className="h-11 w-11 rounded-full object-cover" />
          <span
            className={cn(
              'font-display text-lg font-bold',
              isSolid ? 'text-primary-600 dark:text-primary-300' : 'text-white',
            )}
          >
            APCDD
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:ml-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.key}
              href="/"
              onClick={goToSection(link.id)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary-500',
                isSolid ? 'text-primary-body' : 'text-white',
              )}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <LanguageSwitcher />
          <a href="/" onClick={goToSection('membership')}>
            <Button
              variant="outline"
              size="sm"
              className={cn(!isSolid && 'border-white text-white hover:bg-white/10')}
            >
              <Users className="size-4" /> {t('nav.becomeMember')}
            </Button>
          </a>
          <a href="/" onClick={goToSection('donation')}>
            <Button variant="accent" size="sm">
              <Heart className="size-4" /> {t('nav.donate')}
            </Button>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={cn('lg:hidden', isSolid ? 'text-primary-body' : 'text-white')}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-subtle bg-surface px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href="/"
                onClick={(e) => {
                  goToSection(link.id)(e);
                  setOpen(false);
                }}
                className="text-sm font-medium text-primary-body"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <div className="flex items-center justify-between border-t border-subtle pt-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <a
              href="/"
              onClick={(e) => {
                goToSection('membership')(e);
                setOpen(false);
              }}
            >
              <Button variant="outline" size="sm" className="w-full">
                {t('nav.becomeMember')}
              </Button>
            </a>
            <a
              href="/"
              onClick={(e) => {
                goToSection('donation')(e);
                setOpen(false);
              }}
            >
              <Button variant="accent" size="sm" className="w-full">
                {t('nav.donate')}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
