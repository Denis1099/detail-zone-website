
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTAForm } from "@/components/sections/CTAForm";
import { MoreDetails } from "@/components/sections/MoreDetails";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTAForm />
      <MoreDetails />
      <Footer />
    </div>
  );
};

export default Index;
