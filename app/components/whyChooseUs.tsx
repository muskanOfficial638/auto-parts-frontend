import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            <span className="text-cyan-500">Why</span> Choose Us
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Verified Suppliers
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Wide Variety
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Quality Work
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Affordable Rates
              </h3>
              <p className="text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          {/* Read More Link */}
          <a
            href="#"
            className="inline-block mt-10 text-cyan-500 font-medium text-sm hover:underline"
          >
            Read More →
          </a>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[400px] md:h-[500px] flex justify-center md:justify-end">
          <Image
            src="/whyChooseRight.png"
            alt="Auto Parts Filters"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Top Brands Row */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-row justify-center items-center gap-12">
        {[
          "/isuzu-logo.png",
          "/porsche-logo.png",
          "/dacia.png",
          "/peugeot.png",
          "/honda-logo.png",
          "/tesla-logo.png",
        ].map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="brand logo"
            width={150}
            height={80}
            className="object-contain"
          />
        ))}
      </div>
    </section>
  );
}
