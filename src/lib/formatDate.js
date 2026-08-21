import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

const locales = { fr, en: enUS };

export function formatDate(dateString, lang = 'fr', pattern = 'd MMMM yyyy') {
  if (!dateString) return '';
  return format(new Date(dateString), pattern, { locale: locales[lang] || fr });
}

export function formatDateToMonthYear(dateString, lang = 'fr') {
  return formatDate(dateString, lang, 'MMMM yyyy');
}
