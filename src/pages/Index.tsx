
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { CounterSection } from "@/components/sections/CounterSection";
import { AboutUs } from "@/components/sections/AboutUs";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { VideosSection } from "@/components/sections/VideosSection";
import { CTAForm } from "@/components/sections/CTAForm";
import { MoreDetails } from "@/components/sections/MoreDetails";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CounterSection />
      <AboutUs />
      <Services />
      <Testimonials />
      <VideosSection />
      <Portfolio />
      <CTAForm />
      <MoreDetails />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
