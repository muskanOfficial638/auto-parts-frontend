"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PartsGallery() {
  return (
    <section className="bg-black lg:py-[100px] md:pb-[60px] pb-0 pt-[60px] text-white">
      <div className="container grid md:grid-cols-3 gap-[15px]">
        {/* Left Large Image */}
        <motion.div
          className="md:col-span-2 relative rounded-2xl overflow-hidden group"
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
            className="object-cover w-full h-full transition duration-300 ease-in-out group-hover:scale-110"
            priority
          />
          {/* Overlay bottom text and button (visible on hover only) */}
          <div
            className="absolute bottom-0 left-0 w-full bg-white/90 text-black flex 
               items-center justify-between flex-wrap gap-y-[10px] px-[20px] py-[20px] rounded-b-2xl
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="font-semibold leading-[18px] text-[sm] md:text-[15px]">
              Spare Parts for Industry
            </span>
            <a
              href="#"
              className="bg-autoblue hover:bg-hoverblue text-white px-[13px] py-[8px] rounded-[4px] 
                 text-sm font-semibold leading-[14px] duration-400"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Right Grid of 4 Small Images */}
        <div className="grid grid-cols-2 grid-rows-2 gap-[15px]">
          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/spare-part-2.png"
              alt="Part 1"
              width={400}
              height={250}
              className="object-cover w-full h-full transition duration-300 ease-in-out group-hover:scale-110"
            />
            {/* Overlay bottom text and button (visible on hover only) */}
          <div
            className="absolute bottom-0 left-0 w-full bg-white/90 text-black flex 
               items-center justify-between flex-wrap gap-y-[10px] px-[20px] py-[20px] rounded-b-2xl
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="font-semibold leading-[18px] text-[sm] md:text-[15px]">
              Spare Parts for Industry
            </span>
            <a
              href="#"
              className="bg-autoblue hover:bg-hoverblue text-white px-[13px] py-[8px] rounded-[4px] 
                 text-sm font-semibold leading-[14px] duration-400"
            >
              Learn More
            </a>
          </div>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/spare-part-3.png"
              alt="Part 2"
              width={400}
              height={250}
              className="object-cover w-full h-full transition duration-300 ease-in-out group-hover:scale-110"
            />
            {/* Overlay bottom text and button (visible on hover only) */}
          <div
            className="absolute bottom-0 left-0 w-full bg-white/90 text-black flex 
               items-center justify-between flex-wrap gap-y-[10px] px-[20px] py-[20px] rounded-b-2xl
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="font-semibold leading-[18px] text-[sm] md:text-[15px]">
              Spare Parts for Industry
            </span>
            <a
              href="#"
              className="bg-autoblue hover:bg-hoverblue text-white px-[13px] py-[8px] rounded-[4px] 
                 text-sm font-semibold leading-[14px] duration-400"
            >
              Learn More
            </a>
          </div>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/spare-part-4.png"
              alt="Part 3"
              width={400}
              height={250}
              className="object-cover w-full h-full transition duration-300 ease-in-out group-hover:scale-110"
            />
            {/* Overlay bottom text and button (visible on hover only) */}
          <div
            className="absolute bottom-0 left-0 w-full bg-white/90 text-black flex 
               items-center justify-between flex-wrap gap-y-[10px] px-[20px] py-[20px] rounded-b-2xl
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="font-semibold leading-[18px] text-[sm] md:text-[15px]">
              Spare Parts for Industry
            </span>
            <a
              href="#"
              className="bg-autoblue hover:bg-hoverblue text-white px-[13px] py-[8px] rounded-[4px] 
                 text-sm font-semibold leading-[14px] duration-400"
            >
              Learn More
            </a>
          </div>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/spare-part-5.png"
              alt="Part 4"
              width={400}
              height={250}
              className="object-cover w-full h-full transition duration-300 ease-in-out group-hover:scale-110"
            />
            {/* Overlay bottom text and button (visible on hover only) */}
          <div
            className="absolute bottom-0 left-0 w-full bg-white/90 text-black flex 
               items-center justify-between flex-wrap gap-y-[10px] px-[20px] py-[20px] rounded-b-2xl
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="font-semibold leading-[18px] text-[sm] md:text-[15px]">
              Spare Parts for Industry
            </span>
            <a
              href="#"
              className="bg-autoblue hover:bg-hoverblue text-white px-[13px] py-[8px] rounded-[4px] 
                 text-sm font-semibold leading-[14px] duration-400"
            >
              Learn More
            </a>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
