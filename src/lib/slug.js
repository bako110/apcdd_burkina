const ID_SUFFIX_LENGTH = 8;

function slugifyText(text) {
  return (text || '')
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * Construit une URL lisible qui cache l'id Mongo brut : le titre devient un
 * slug, suivi d'un court suffixe dérivé de l'id (nécessaire pour retrouver
 * le bon document, aucune route API par slug n'existe côté backend).
 */
export function buildSlug(id, title) {
  const idSuffix = String(id).slice(-ID_SUFFIX_LENGTH);
  const textSlug = slugifyText(title);
  return textSlug ? `${textSlug}-${idSuffix}` : idSuffix;
}

/**
 * Retrouve l'id Mongo complet à partir du slug d'URL, en cherchant dans une
 * liste déjà chargée (les ids se terminant par le même suffixe).
 */
export function findIdBySlug(items, slug) {
  if (!slug) return null;
  const idSuffix = slug.slice(-ID_SUFFIX_LENGTH);
  const match = items.find((item) => String(item._id).endsWith(idSuffix));
  return match?._id ?? null;
}
