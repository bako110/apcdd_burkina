import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Leaf,
} from 'lucide-react';
import { QuickContactForm } from '../../features/contact/QuickContactForm.jsx';
import { useSectionLink } from '../../hooks/useSectionLink.js';

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100068169005462', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/apcdd', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/apcdd', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/apcdd', label: 'LinkedIn' },
  { icon: Youtube, href: 'http://www.youtube.com/@festivalbansa5288', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://wa.me/+22671639357', label: 'WhatsApp' },
];

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const goToSection = useSectionLink();

  return (
    <footer id="contact" className="bg-neutral-900 py-16 text-neutral-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-4">
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
            <Leaf className="size-5 text-primary-400" /> APCDD
          </h3>
          <p className="text-sm text-neutral-300">{t('footer.tagline')}</p>
          <div className="mt-5">
            <h4 className="mb-3 text-sm font-semibold">{t('footer.followUs')}</h4>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-neutral-700 transition-colors hover:border-primary-400 hover:text-primary-400"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">{t('footer.navigation')}</h4>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li><a href="/" onClick={goToSection('about')} className="hover:text-primary-400">{t('nav.about')}</a></li>
            <li><a href="/" onClick={goToSection('services')} className="hover:text-primary-400">{t('nav.services')}</a></li>
            <li><a href="/" onClick={goToSection('events')} className="hover:text-primary-400">{t('nav.events')}</a></li>
            <li><a href="/" onClick={goToSection('gallery')} className="hover:text-primary-400">{t('nav.gallery')}</a></li>
            <li><a href="/" onClick={goToSection('news')} className="hover:text-primary-400">{t('nav.news')}</a></li>
            <li><a href="/" onClick={goToSection('partners')} className="hover:text-primary-400">{t('nav.partners')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">{t('footer.contact')}</h4>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li className="flex gap-2">
              <MapPin className="size-4 shrink-0 text-primary-400" />
              <span>Secteur 15, Ouagadougou, Burkina Faso</span>
            </li>
            <li className="flex gap-2">
              <Phone className="size-4 shrink-0 text-primary-400" />
              <a href="tel:+22677165228" className="hover:text-primary-400">+226 77 16 52 28</a>
            </li>
            <li className="flex gap-2">
              <MessageCircle className="size-4 shrink-0 text-primary-400" />
              <a href="https://wa.me/22671639357" className="hover:text-primary-400">+226 71 63 93 57</a>
            </li>
            <li className="flex gap-2">
              <Mail className="size-4 shrink-0 text-primary-400" />
              <a href="mailto:contact@apcdd.bf" className="hover:text-primary-400">contact@apcdd.bf</a>
            </li>
            <li className="flex gap-2">
              <Globe className="size-4 shrink-0 text-primary-400" />
              <a href="https://www.apcdd.bf" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400">
                www.apcdd.bf
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">{t('footer.quickContact')}</h4>
          <QuickContactForm compact />
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-neutral-800 px-4 pt-6 text-sm text-neutral-400 sm:flex-row sm:px-6">
        <p>© {year} {t('footer.rightsReserved')}</p>
        <div className="flex gap-4">
          <Link to="/confidentialite" className="hover:text-primary-400">{t('footer.privacy')}</Link>
          <Link to="/conditions" className="hover:text-primary-400">{t('footer.terms')}</Link>
          <Link to="/cookies" className="hover:text-primary-400">{t('footer.cookies')}</Link>
        </div>
      </div>
    </footer>
  );
}
