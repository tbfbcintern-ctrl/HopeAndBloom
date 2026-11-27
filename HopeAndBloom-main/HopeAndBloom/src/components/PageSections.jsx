import {
  GlanceBanner,
  PurposeSection,
  AboutCenterSection,
  ApproachSection,
  PromoSection
} from './sections/IntroSections.jsx';
import {
  ServicesSection,
  RoadmapSection,
  FaqSection
} from './sections/ProgramSections.jsx';
import { ContactSection } from './sections/ContactSection.jsx';

export function PageSections() {
  return (
    <>
      <GlanceBanner />
      <PurposeSection />
      <AboutCenterSection />
      <ApproachSection />
      <PromoSection />
      <ServicesSection />
      <RoadmapSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
