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
      className="relative w-full bg-cover bg-center flex items-center justify-start bg-black text-white overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ backgroundImage: "url('/where-section.jpg')" }}
    >
      {/* Background Image */}
    

      {/* Content */}
      <motion.div
        className="relative container z-10 lg:py-[100px] py-[60px] grid md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Left Text Section */}
        <div>
          <h2 className="md:text-[40px] text-[30px] leading-[54px] font-bold mb-[30px]">
            <span className="text-autoblue">Where</span> Does It Come From
          </h2>

          {/* 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[30px] gap-x-[50px] ">
            <div>
              <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[11px]">
                Where can I get some
              </h3>
              <p className="md:text-base text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div>
              <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[11px]">
                Where does it come from
              </h3>
              <p className="md:text-base text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div>
              <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[11px]">Quality work</h3>
              <p className="md:text-base text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
            <div>
              <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[11px]">Affordable Rates</h3>
              <p className="md:text-base text-sm leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>

          <a
            href="#"
            className="inline-block mt-[24px] text-autoblue font-semibold text-sm hover:underline"
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
