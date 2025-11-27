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

export default function Footer() {
  return (
    <footer className="bg-[#12151B] text-white px-6 py-10 md:px-16 lg:px-24">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 border-b border-gray-700 pb-10">
        {/* Logo + Socials */}
        <div className="space-y-4">
          <div className="relative w-48 h-12">
            <Image
              src="/autoPartLogo.png"
              alt="Auto Parts XChange Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-2">
            <p className="flex items-center gap-2 hover:text-white cursor-pointer">
              <a href="#" className="hover:text-white p-1 rounded-full bg-white">
              <FaQuestion className="text-black text-sm"/>
              </a> Help & Support
            </p>
            <p className="flex items-center gap-2 hover:text-white cursor-pointer">
              <MdAccessibility /> Accessibility
            </p>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <a href="#" className="hover:text-white p-1 rounded-full bg-white">
              <FaFacebookF className="text-black text-sm"/>
            </a>
            <a href="#" className="hover:text-white p-1 rounded-full bg-white">
              <FaXTwitter className="text-black text-sm"/>
            </a>
            <a href="#" className="hover:text-white p-1 rounded-full bg-white">
              <FaYoutube className="text-black text-sm"/>
            </a>
            <a href="#" className="hover:text-white p-1 rounded-full bg-white">
              <FaPinterestP className="text-black text-sm"/>
            </a>
            <a href="#" className="hover:text-white p-1 rounded-full bg-white">
              <FaLinkedinIn className="text-black text-sm"/>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About", "Blog", "Contact", "Login", "Sign Up"].map(
              (link) => (
                <li key={link} className="hover:text-white cursor-pointer">
                  {link}
                </li>
              )
            )}
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold text-white mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            {["How it Works", "Security", "Investor", "News", "Careers"].map(
              (link) => (
                <li key={link} className="hover:text-white cursor-pointer">
                  {link}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Terms of Service",
              "Privacy Policy",
              "Copyright Policy",
              "Fees and Charges",
              "Code of Conduct",
            ].map((link) => (
              <li key={link} className="hover:text-white cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <a href="tel:+91 1414523119" className="flex items-center gap-2">
              <MdCall className="text-lg" /> +91 1414523119
            </a>
            <a href="mailto:autoparts@gmail.com" className="flex items-center gap-2">
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
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 mt-6">
        <p>Copyright 2025 © AutoParts Theme. All rights reserved.</p>
        <div className="mt-3 md:mt-0 text-right">
          <p className="font-semibold text-white">25,160,181</p>
          <p>Total AutoParts Posted</p>
        </div>
      </div>
    </footer>
  );
}
