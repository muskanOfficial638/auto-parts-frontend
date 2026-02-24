"use client";

import {
  FaFacebookF,
  FaPinterestP,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaQuestion,
} from "react-icons/fa6";
import { MdAccessibility, MdLocationOn, MdEmail, MdCall } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brandBlack text-white pt-[66px] pb-[24px] ">
      <div className="container">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-[#232A35] pb-[50px]">
          {/* Logo + Socials */}
          <div className="space-y-5">
            <div className="relative w-48 max-w-full h-12">
              <Image
                src="/autoPartLogo.png"
                alt="Auto Parts XChange Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-4">
              <p className="flex items-center text-sm leading-[26px] gap-2 hover:text-white cursor-pointer">
                <a
                  href="#"
                  className="hover:text-white p-1 rounded-full bg-white"
                >
                  <FaQuestion className="text-black text-sm" />
                </a>{" "}
                Help & Support
              </p>
              <p className="flex items-center gap-2 text-sm leading-[26px] hover:text-white cursor-pointer">
                <MdAccessibility /> Accessibility
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 ">
              <a
                href="#"
                className="hover:text-white text-black hover:bg-hoverblue duration-400 p-2 rounded-full bg-white"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="#"
                className="hover:text-white text-black hover:bg-hoverblue duration-400  p-2 rounded-full bg-white"
              >
                <FaXTwitter className="text-sm" />
              </a>
              <a
                href="#"
                className="hover:text-white text-black hover:bg-hoverblue duration-400 p-2 rounded-full bg-white"
              >
                <FaYoutube className="text-sm" />
              </a>
              <a
                href="#"
                className="hover:text-white text-black hover:bg-hoverblue duration-400 p-2 rounded-full bg-white"
              >
                <FaPinterestP className="text-sm" />
              </a>
              <a
                href="#"
                className="hover:text-white text-black hover:bg-hoverblue duration-400 p-2 rounded-full bg-white"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-[18px] text-white mb-[20px]">
              Quick Links
            </h3>
            <ul className="space-y-6 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about-us" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li
                  key={link.name}
                  className="hover:text-hoverblue duration-400 cursor-pointer"
                >
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-[18px] text-white mb-[20px]">
              About
            </h3>
            <ul className="space-y-6 text-sm">
              {[
                { name: "How it Works", href: "/how-it-works" },
                { name: "Security", href: "/security" },
                { name: "Investor", href: "/investor" },
                { name: "News", href: "/news" },
                { name: "Careers", href: "/careers" },
              ].map((link) => (
                <li
                  key={link.name}
                  className="hover:text-hoverblue duration-400 cursor-pointer"
                >
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-[18px] text-white mb-[20px]">
              Legal
            </h3>
            <ul className="space-y-6 text-sm">
              {[
                { name: "Terms of Service", href: "/terms-of-service" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Copyright Policy", href: "/copyright-policy" },
                { name: "Fees and Charges", href: "/fees-and-charges" },
                { name: "Code of Conduct", href: "/code-of-conduct" },
              ].map((link) => (
                <li
                  key={link.name}
                  className="hover:text-hoverblue duration-400 cursor-pointer"
                >
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[18px] text-white mb-[20px]">
              Contact Us
            </h3>
            <ul className="space-y-6 text-sm">
              <a
                href="tel:+91 1414523119"
                className="flex hover:text-hoverblue duration-400 items-center gap-2"
              >
                <MdCall className="text-lg" /> +91 1414523119
              </a>
              <a
                href="mailto:autoparts@gmail.com"
                className="flex break-all hover:text-hoverblue duration-400 items-center gap-2"
              >
                <MdEmail className="text-lg" /> autoparts@gmail.com
              </a>
              <li className="flex items-start gap-2">
                <MdLocationOn className="text-lg mt-1" />
                <span>
                  207, Pinkcity-2, Main Kalwar Rd, <br /> Jhotwara, Jaipur
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs mt-[15px]">
          <p>Copyright 2025 © AutoParts Theme. All rights reserved.</p>
          <div className="mt-3 md:mt-0 text-right">
            <p className="text-white">
              <strong className="me-[6px]">25,160,181 Total</strong>AutoParts
              Posted
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
