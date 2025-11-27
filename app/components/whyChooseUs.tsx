"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BrandBar from "./BrandBar";

export default function WhyChooseUs() {
  return (
      <section className="bg-black text-white relative overflow-hidden">
         <BrandBar />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          {/* Left Content */}
          <motion.div
            className="z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-10">
              <span className="text-autoblue">Why</span> Choose Us
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Verified Suppliers
                </h3>
                <p className="text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Wide Variety
                </h3>
                <p className="text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Quality Work
                </h3>
                <p className="text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Affordable Rates
                </h3>
                <p className="text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>

            {/* Read More Link */}
            <a
              href="#"
              className="inline-block mt-10 text-autoblue font-medium text-sm hover:underline"
            >
              Read More →
            </a>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative w-full h-[400px] md:h-[500px] flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/whyChooseRight.png"
              alt="Auto Parts Filters"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </section>
  );
}
