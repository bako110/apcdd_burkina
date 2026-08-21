import { useTranslation } from 'react-i18next';

export function CookiesPage() {
  const { t } = useTranslation('legal');
  const types = t('cookies.types', { returnObjects: true });

  return (
    <main className="min-h-screen bg-surface pb-20 pt-28 text-primary-body">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{t('cookies.title')}</h1>

        <div className="mt-10 space-y-8">
          <p className="text-base leading-relaxed text-muted">{t('cookies.intro')}</p>

          <div className="space-y-6">
            {Array.isArray(types) &&
              types.map((type) => (
                <section key={type.label}>
                  <h2 className="text-xl font-semibold text-primary-body">{type.label}</h2>
                  <p className="mt-3 text-base leading-relaxed text-muted">{type.text}</p>
                </section>
              ))}
          </div>

          <p className="text-base leading-relaxed text-muted">{t('cookies.outro')}</p>
        </div>
      </div>
    </main>
  );
}
