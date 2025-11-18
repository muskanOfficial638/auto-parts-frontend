"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function StandardSection() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-10">
            <span className="text-cyan-500">The Standard</span>{" "}
            Lorem Ipsum Passage, Used Since
          </h2>

          {/* Item 1 */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">
              Where can I get some
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <a
              href="#"
              className="text-cyan-500 text-sm font-medium hover:underline"
            >
              View More →
            </a>
          </div>

          {/* Item 2 */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-2">
              Where can I get some
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <a
              href="#"
              className="text-cyan-500 text-sm font-medium hover:underline"
            >
              View More →
            </a>
          </div>

          {/* Item 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Where can I get some
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </p>
            <a
              href="#"
              className="text-cyan-500 text-sm font-medium hover:underline"
            >
              View More →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
