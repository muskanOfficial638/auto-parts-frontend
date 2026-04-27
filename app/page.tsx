import WhyChooseUs from "./components/whyChooseUs";
import PartsGallery from "./components/PartsGallery";
import StandardSection from "./components/StandardSection";
import WhereSection from "./components/WhereSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <ScrollToTop />

      <Header />

      
      <HeroSection />

    
      <WhyChooseUs />


      <PartsGallery />

      
      <StandardSection />


      <WhereSection />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
