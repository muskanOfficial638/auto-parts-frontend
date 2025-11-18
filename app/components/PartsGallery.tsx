"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PartsGallery() {
  return (
    <section className="bg-black py-20 px-6 md:px-16 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Left Large Image */}
        <motion.div
          className="md:col-span-2 relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src="/spare-part-1.png"
            alt="Spare Parts"
            width={800}
            height={500}
            className="object-cover w-full h-full"
            priority
          />
          {/* Overlay bottom text and button */}
          <div className="absolute bottom-0 left-0 w-full bg-white/90 text-black flex items-center justify-between px-6 py-4 rounded-b-2xl">
            <span className="font-medium text-sm md:text-base">
              Spare Parts for Industry
            </span>
            <a
              href="#"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Right Grid of 4 Small Images */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/spare-part-2.png"
              alt="Part 1"
              width={400}
              height={250}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/spare-part-3.png"
              alt="Part 2"
              width={400}
              height={250}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/spare-part-4.png"
              alt="Part 3"
              width={400}
              height={250}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/spare-part-5.png"
              alt="Part 4"
              width={400}
              height={250}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
