import Image from "next/image";
import WhyChooseUs from "./components/whyChooseUs";
import PartsGallery from "./components/PartsGallery";
import StandardSection from "./components/StandardSection";
import WhereSection from "./components/WhereSection";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-start px-10">
        {/* Background Image */}
        <Image
          src="/hero-banner.jpg"
          alt="hero banner"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Overlay Content */}
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            What is <span className="block">Lorem Ipsum.</span>
          </h1>

          <ul className="space-y-2 text-gray-300 list-disc list-inside">
            <li>Lorem Ipsum is simply dummy text of the printing</li>
            <li>
              It is a long established fact that a reader will be distracted
            </li>
            <li>Contrary to popular belief, Lorem Ipsum is not simply</li>
            <li>There are many variations of passages of Lorem Ipsum</li>
          </ul>

          <div className="flex space-x-4 pt-4">
            <a
              href="#"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-md font-medium transition"
            >
              View All Products
            </a>
            <a
              href="#"
              className="border border-gray-400 hover:border-cyan-500 px-5 py-2 rounded-md font-medium transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

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
