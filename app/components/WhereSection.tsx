"use client";

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function WhereSection() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1.5], ["0vh", "150vh"]);

  return (
    <motion.section
      ref={container}
      className="relative w-full h-screen flex items-center justify-start px-10 md:h-[600px] bg-black text-white overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Background Image */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/where-section.jpg"
          alt="Mechanic working on car"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/70" /> Dark overlay */}
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Left Text Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
            <span className="text-autoblue">Where</span> Does It Come From
          </h2>

          {/* 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Where can I get some
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Where does it come from
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Quality work</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Affordable Rates</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <a
            href="#"
            className="text-autoblue text-sm font-medium hover:underline inline-flex items-center"
          >
            Read More →
          </a>
        </div>

        {/* Right side intentionally left empty for image focus */}
        <div className="hidden md:block"></div>
      </motion.div>
    </motion.section>
  );
}
