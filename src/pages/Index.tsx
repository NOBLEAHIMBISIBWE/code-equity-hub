import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import UsersSection from "@/components/UsersSection";
import ImpactSection from "@/components/ImpactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UsersSection />
        <ImpactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
