import { useTranslation } from 'react-i18next';

export function TermsPage() {
  const { t } = useTranslation('legal');
  const sections = t('terms.sections', { returnObjects: true });

  return (
    <main className="min-h-screen bg-surface pb-20 pt-28 text-primary-body">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">{t('terms.title')}</h1>

        <div className="mt-10 space-y-8">
          {Array.isArray(sections) &&
            sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-primary-body">{section.heading}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">{section.text}</p>
              </section>
            ))}
        </div>
      </div>
    </main>
  );
}
