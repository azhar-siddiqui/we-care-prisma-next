import Benefits from './_components/benefits';
import Contact from './_components/contact';
import Cta from './_components/cta';
import Faq from './_components/faq';
import Features from './_components/features';
import Footer from './_components/footer';
import MarketingHero from './_components/hero';
import MarketingHeader from './_components/marketing-header';
import Pricing from './_components/pricing';
import Testimonials from './_components/testimonials';
import Trusted from './_components/trusted';

export default function Home() {
  return (
    <>
      {/* Header */}
      <MarketingHeader />
      {/* Hero Section */}
      <MarketingHero />
      {/* Trusted By Section */}
      <Trusted />
      {/* Features Section */}
      <Features />
      {/* Benefits Section */}
      <Benefits />
      {/* Testimonials */}
      <Testimonials />
      {/* Pricing Section */}
      <Pricing />
      {/* FAQ Section */}
      <Faq />
      {/* Contact Section */}
      <Contact />
      {/* CTA Section */}
      <Cta />
      {/* Footer */}
      <Footer />
    </>
  );
}
