import Image from "next/image";

export default function WhereSection() {
  return (
    <section className="relative w-full h-auto md:h-[600px] bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/where-section.jpg"
          alt="Mechanic working on car"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/70" /> Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
            <span className="text-cyan-500">Where</span> Does It Come From
          </h2>

          {/* 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Where can I get some</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Where does it come from</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quality work</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Affordable Rates</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </div>
          </div>

          <a
            href="#"
            className="text-cyan-500 text-sm font-medium hover:underline inline-flex items-center"
          >
            Read More →
          </a>
        </div>

        {/* Right side intentionally left empty for image focus */}
        <div className="hidden md:block"></div>
      </div>
    </section>
  );
}
