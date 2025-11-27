"use client";

import Image from "next/image";

const brands = [
  "/isuzu-logo.png",
  "/porsche-logo.png",
  "/dacia.png",
  "/peugeot.png",
  "/honda-logo.png",
  "/tesla-logo.png",
];

export default function BrandBar() {
  return (
    <section className="w-full bg-[#12151B] py-6">
      <div className="container mx-auto flex items-center justify-center gap-16">
        {brands.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="brand logo"
            width={150}
            height={80}
            className="object-contain opacity-90 hover:opacity-100 transition"
          />
        ))}
      </div>
    </section>
  );
}
