"use client";

import Image from "next/image";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"]);

  return (
    <motion.section
      ref={container}
      className="relative h-screen flex items-center justify-start px-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Background Image */}
        <Image
          src="/hero-banner.jpg"
          alt="hero banner"
          fill
          className="object-cover opacity-60"
          priority
        />
      </motion.div>
      {/* Overlay Content */}
      <ParallaxProvider>
        {" "}
        {/* Create scrollable content */}
        <div className="relative z-10 max-w-2xl space-y-6">
          <Parallax speed={10}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                What is <span className="block">Lorem Ipsum.</span>
              </h1>
            </motion.div>
          </Parallax>
          <Parallax speed={-1}>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Lorem Ipsum is simply dummy text of the printing</li>
              <li>
                It is a long established fact that a reader will be distracted
              </li>
              <li>Contrary to popular belief, Lorem Ipsum is not simply</li>
              <li>There are many variations of passages of Lorem Ipsum</li>
            </ul>
          </Parallax>
          <Parallax speed={-2}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="flex space-x-4 pt-4">
                <a
                  href="#"
                  className="bg-autoblue hover:bg-hoverblue text-white px-5 py-2 rounded-md font-medium transition"
                >
                  View All Products
                </a>
                <a
                  href="#"
                  className="border border-gray-400 hover:border-autoblue px-5 py-2 rounded-md font-medium transition"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </Parallax>
        </div>
      </ParallaxProvider>
    </motion.section>
  );
}
