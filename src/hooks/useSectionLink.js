import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAVBAR_OFFSET = 80;

function scrollToSectionId(sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * Navigue vers une section de la page d'accueil sans jamais exposer de "#"
 * dans l'URL : scroll direct si on est déjà sur "/", sinon navigation vers
 * "/" suivie du scroll une fois la page montée.
 */
export function useSectionLink() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (sectionId) =>
      (event) => {
        event?.preventDefault?.();

        if (location.pathname === '/') {
          scrollToSectionId(sectionId);
          return;
        }

        navigate('/');
        requestAnimationFrame(() => {
          setTimeout(() => scrollToSectionId(sectionId), 60);
        });
      },
    [navigate, location.pathname],
  );
}
