"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 w-full z-20 
  bg-black/50 backdrop-blur-md
  flex items-center justify-between 
  px-8 lg:px-16 py-8"
    >
      <div className="flex flex-row space-x-10">
        {/* Logo */}
        <Link href="/" scroll={true} className="relative w-40 h-10">
          <Image
            src="/autoPartLogo.png"
            alt="Auto Parts XChange Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-10 text-white text-sm font-medium">
          <div className="relative group">
            <button className="hover:text-cyan-400 flex items-center">
              Find Auto Parts <span className="ml-1">▾</span>
            </button>

            {/* Dropdown */}
            <div className="absolute hidden group-hover:block bg-black/90 rounded-md mt-2 py-2 shadow-lg w-40">
              <a href="#" className="block px-4 py-2 hover:bg-gray-800">
                Engine
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-800">
                Brakes
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-800">
                Suspension
              </a>
            </div>
          </div>

          <a href="#" className="hover:text-cyan-400">
            About Us
          </a>
          <a href="#" className="hover:text-cyan-400">
            Contact
          </a>
        </nav>
      </div>
      {/* Buttons */}
      <div className="flex items-center space-x-6 text-sm font-medium text-white">
        <a href="/login" className="hover:text-cyan-400">
          Login
        </a>
        <a href="/login" className="hover:text-cyan-400">
          Sign Up
        </a>
        <a
          href="#"
          className="bg-autoblue hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
        >
          Request Auto Parts
        </a>
      </div>
    </header>
  );
}
