"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import BrandBar from "./BrandBar";

export default function WhyChooseUs() {
  return (
      <section className="bg-black text-white relative overflow-hidden">
         <BrandBar />
        <div className="max-w-7xl mx-auto lg:pt-[100px] pt-[60px] grid md:grid-cols-2 gap-12 items-center lg:px-4 px-6">
          {/* Left Content */}
          <motion.div
            className="z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="md:text-[40px] text-[30px] leading-[54px] font-bold mb-[30px]">
              <span className="text-autoblue">Why</span> Choose Us
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[30px] gap-x-[50px] ">
              <div>
                <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[11px]">
                  Verified Suppliers
                </h3>
                <p className="md:text-base text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div>
                <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[11px]">
                  Wide Variety
                </h3>
                <p className="md:text-base text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div>
                <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[11px]">
                  Quality Work
                </h3>
                <p className="md:text-base text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>

              <div>
                <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[11px]">
                  Affordable Rates
                </h3>
                <p className="md:text-base text-sm leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>

            {/* Read More Link */}
            <a
              href="#"
              className="inline-block mt-[24px] text-autoblue font-semibold text-sm hover:underline"
            >
              Read More →
            </a>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative w-full flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/whyChooseRight.png"
              alt="Auto Parts Filters"
              width={400}
              height={400}
              className="h-auto w-auto"
              priority
            />
          </motion.div>
        </div>
      </section>
  );
}
