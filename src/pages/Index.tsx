
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs"; // Import the new AboutUs component
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTAForm } from "@/components/sections/CTAForm";
import { MoreDetails } from "@/components/sections/MoreDetails";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutUs /> {/* Add the new AboutUs section right after Hero */}
      <Services />
      <Testimonials /> {/* Reordered: Testimonials before Portfolio */}
      <Portfolio /> {/* Reordered: Portfolio after Testimonials */}
      <CTAForm />
      <MoreDetails />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
