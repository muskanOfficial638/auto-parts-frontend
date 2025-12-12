"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StandardSection() {
  return (
    <section className="bg-black text-white lg:py-20 md:pb-[60px]">
      <div className="container grid lg:grid-cols-2 grid-cols-1 md:gap-12 items-center">
        {/* Left Image */}
        <motion.div
          className="relative w-full h-[450px] md:h-[550px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/standard-section.png"
            alt="Auto Parts Kit"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Right Content */}
       <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="md:text-[40px] text-[30px] leading-[54px] font-bold mb-[30px]">
            <span className="text-autoblue">The Standard</span>{" "}
            Lorem Ipsum Passage, Used Since
          </h2>

          {/* Item 1 */}
          <div className="mb-[30px]">
            <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[13px]">
              Where can I get some
            </h3>
            <p className="md:text-base text-sm leading-relaxed mb-[13px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. standard dummy text ever since the 1500s, when an unknown printer took a galley 
              of type and scrambled it to make a type specimen book.
            </p>
            <a
              href="#"
              className="text-autoblue text-sm font-semibold hover:underline"
            >
              View More →
            </a>
          </div>

          {/* Item 2 */}
          <div className="mb-[30px]">
            <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[13px]">
              Where can I get some
            </h3>
            <p className="md:text-base text-sm leading-relaxed mb-[13px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. standard dummy text ever since the 1500s, when an unknown printer took a galley 
              of type and scrambled it to make a type specimen book.
            </p>
            <a
              href="#"
              className="text-autoblue text-base font-semibold hover:underline"
            >
              View More →
            </a>
          </div>

          {/* Item 3 */}
          <div>
            <h3 className="md:text-[20px] text-[18px] font-bold leading-[24px] text-white mb-[13px]">
              Where can I get some
            </h3>
            <p className="md:text-base text-sm leading-relaxed mb-[13px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. standard dummy text ever since the 1500s, when an unknown printer took a galley 
              of type and scrambled it to make a type specimen book.
            </p>
            <a
              href="#"
              className="text-autoblue text-sm font-semibold hover:underline"
            >
              View More →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
