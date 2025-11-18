import WhyChooseUs from "./components/whyChooseUs";
import PartsGallery from "./components/PartsGallery";
import StandardSection from "./components/StandardSection";
import WhereSection from "./components/WhereSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Why choose Section */}
      <WhyChooseUs />

      {/* Parts Gallery Section*/}
      <PartsGallery />

      {/* Standard Section*/}
      <StandardSection />

      {/* Where Section*/}
      <WhereSection />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
