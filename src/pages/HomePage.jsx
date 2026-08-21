import { Hero } from '../features/hero/Hero.jsx';
import { AboutSection } from '../features/about/AboutSection.jsx';
import { ServicesSection } from '../features/services/ServicesSection.jsx';
import { EventsSection } from '../features/events/EventsSection.jsx';
import { GallerySection } from '../features/gallery/GallerySection.jsx';
import { StatsSection } from '../features/stats/StatsSection.jsx';
import { NewsSection } from '../features/news/NewsSection.jsx';
import { PartnersSection } from '../features/partners/PartnersSection.jsx';
import { MembershipSection } from '../features/membership/MembershipSection.jsx';
import { DonationSection } from '../features/donation/DonationSection.jsx';
import { CtaSection } from '../features/cta/CtaSection.jsx';

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <EventsSection />
      <GallerySection />
      <ServicesSection />
      <StatsSection />
      <NewsSection />
      <PartnersSection />
      <MembershipSection />
      <DonationSection />
      <CtaSection />
    </>
  );
}
